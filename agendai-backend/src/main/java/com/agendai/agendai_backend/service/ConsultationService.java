package com.agendai.agendai_backend.service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.agendai.agendai_backend.DTO.Consultation.ConsultationDTO;
import com.agendai.agendai_backend.DTO.Consultation.ConsultationResponseDTO;
import com.agendai.agendai_backend.DTO.Consultation.ValidatedConsultationDTO;
import com.agendai.agendai_backend.model.CandidatesModel;
import com.agendai.agendai_backend.model.ConsultationModel;
import com.agendai.agendai_backend.model.MedicModel;
import com.agendai.agendai_backend.model.PatientModel;
import com.agendai.agendai_backend.model.SecretaryModel;
import com.agendai.agendai_backend.repository.CandidatesRepository;
import com.agendai.agendai_backend.repository.ConsultationRepository;
import com.agendai.agendai_backend.repository.MedicRepositroy;
import com.agendai.agendai_backend.repository.PatientRepository;
import com.agendai.agendai_backend.repository.SecretaryRepository;

@Service
public class ConsultationService {

    @Autowired
    private MedicRepositroy medicRepositroy;

    @Autowired
    private SecretaryRepository secretaryRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private ConsultationRepository consultationRepository;

    @Autowired
    private CandidatesRepository candidatesRepository;

    @Autowired
    private EmailService emailService;

    // Map que mantém ranking/Posicao na fila de agendamento
    private Map<UUID, Map<UUID, Integer>> consultationRankings = new HashMap<>();

    public ConsultationResponseDTO createConsultation(ConsultationDTO data) throws Exception {
        // Verifica se médico, paciente e secretária são existentes no sistema
        ValidatedConsultationDTO validatedPayload = this.validPayload(data);

        // Verifica se paciente já tem consulta nesse horário
        if (this.isPatientScheduled(validatedPayload.getPatient().getId(), data.date()))
            throw new Exception("Paciente já possui consulta nesse horário");

        /*
         * Verifica se há uma consulta marcada nesse horário.
         * Caso houver, coloca na fila de espera.
         * Caso contrário, marca a consulta.
         */
        Optional<ConsultationModel> foundConsultation = this
                .isScheduleAvailable(validatedPayload.getMedic().getId(), data.date());
        if (foundConsultation.isPresent()) {
            ConsultationResponseDTO response = this.pushToCandidatesList(validatedPayload, foundConsultation.get());
            return response;
        }

        PatientModel foundPatient = validatedPayload.getPatient();
        MedicModel foundMedic = validatedPayload.getMedic();
        SecretaryModel foundSecretary = validatedPayload.getSecretary();

        ConsultationModel newConsultationModel = new ConsultationModel(null,
                data.date(), "PENDENTE", foundSecretary, foundMedic, foundPatient, null);

        ConsultationModel savedConsultation = consultationRepository.save(newConsultationModel);
        ConsultationResponseDTO consultationResponseDTO = ConsultationResponseDTO.builder()
                .id(savedConsultation.getId())
                .data(savedConsultation.getDate())
                .estado(savedConsultation.getEstado())
                .secretaryId(savedConsultation.getSecretary().getId())
                .secretaryName(savedConsultation.getSecretary().getName())
                .medicId(savedConsultation.getMedic().getId())
                .medicName(savedConsultation.getMedic().getName())
                .patientId(savedConsultation.getPatient().getId())
                .patientName(savedConsultation.getPatient().getNome())
                .build();

        try{
            emailService.emailConfirmacao(consultationResponseDTO);
            System.out.println("Enviado email com sucesso");
        }catch(Exception e) {
            System.err.println("Erro ao enviar o email:" + e.getMessage());
        }
        return ConsultationResponseDTO.fromModel(savedConsultation);
    }

    public ConsultationModel confirmacaoConsulta(UUID id){
        Optional<ConsultationModel> consultaOptional = consultationRepository.findById(id);
        if(consultaOptional.isPresent()){
            ConsultationModel consulta = consultaOptional.get();
            if((consulta.getEstado()).equals("PENDENTE")){
                consulta.setEstado("CONFIRMADA");
                return consultationRepository.save(consulta);
            } else throw new RuntimeException("Consulta já foi confirmada. Contate nossa clínica para mais informações.");
        }
        throw new RuntimeException("Consulta não encontrada, com o ID:" + id);
    }


    public UUID deleteConsultationById(UUID id) throws Exception {
        Optional<ConsultationModel> foundConsultation = consultationRepository.findById(id);
        if (foundConsultation.isEmpty())
            throw new Exception("Consulta nao encontrada");

        // Remove do ranking
        consultationRankings.remove(id);

        // Deleta do db
        consultationRepository.deleteById(id);
        return id;
    }

    private Optional<ConsultationModel> isScheduleAvailable(UUID medicId, LocalDateTime date) {
        return consultationRepository.findByMedic_IdAndDate(medicId, date);
    }

    private boolean isPatientScheduled(UUID patientId, LocalDateTime date) {
        return consultationRepository.existsByPatient_IdAndDate(patientId, date);
    }

    private ConsultationResponseDTO pushToCandidatesList(ValidatedConsultationDTO validatedPayload,
            ConsultationModel foundConsultation) {

        Map<UUID, Integer> rankingMap = consultationRankings.computeIfAbsent(
                foundConsultation.getId(),
                k -> new HashMap<>());

        // Calcula o ranking
        int newRanking = rankingMap.size(); // 0-based ranking

        // Armazena no map
        rankingMap.put(validatedPayload.getPatient().getId(), newRanking);

        CandidatesModel newCandidate = new CandidatesModel(null, newRanking,
                validatedPayload.getPatient(), foundConsultation);
        candidatesRepository.save(newCandidate);

        foundConsultation.setSecretary(validatedPayload.getSecretary());
        foundConsultation.setPatient(validatedPayload.getPatient());
        return ConsultationResponseDTO.fromModel(foundConsultation);
    }

    private ValidatedConsultationDTO validPayload(ConsultationDTO data) throws Exception {
        Optional<PatientModel> foundPatient = patientRepository.findById(data.patientId());
        if (foundPatient.isEmpty())
            throw new Exception("Paciente não encontrado");

        Optional<MedicModel> foundMedic = medicRepositroy.findById(data.medicId());
        if (foundMedic.isEmpty())
            throw new Exception("Médico não encontrado");

        Optional<SecretaryModel> foundSecretary = secretaryRepository.findById(data.secretaryId());
        if (foundSecretary.isEmpty())
            throw new Exception("Secretária não encontrada");

        ValidatedConsultationDTO validatedDTO = new ValidatedConsultationDTO(foundPatient.get(), foundMedic.get(),
                foundSecretary.get());
        return validatedDTO;
    }
}
