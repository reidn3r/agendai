package com.agendai.agendai_backend.service;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.agendai.agendai_backend.DTO.Consultation.ConsultationDTO;
import com.agendai.agendai_backend.DTO.Consultation.ValidatedDTO;
import com.agendai.agendai_backend.model.ConsultationModel;
import com.agendai.agendai_backend.model.MedicModel;
import com.agendai.agendai_backend.model.PatientModel;
import com.agendai.agendai_backend.model.SecretaryModel;
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

    public ConsultationModel createConsultation(ConsultationDTO data) throws Exception {
        ValidatedDTO validatedPayload = this.validPayload(data);

        PatientModel foundPatient = validatedPayload.getPatient();
        MedicModel foundMedic = validatedPayload.getMedic();
        SecretaryModel foundSecretary = validatedPayload.getSecretary();

        ConsultationModel newConsultationModel = new ConsultationModel(null,
                data.data(), foundSecretary, foundMedic, foundPatient, null);

        /*
         * TODO: ENVIAR NOTIFICAÇÃO POR EMAIL AO USUÁRIO!!!!!!!!!!!!!!!!!!!
         * - Se possível, de forma assíncrona
         */

        return consultationRepository.save(newConsultationModel);
    }

    public void deleteConsultation(UUID id) throws Exception {
        Optional<ConsultationModel> foundConsultation = consultationRepository.findById(id);
        if (foundConsultation.isEmpty())
            throw new Exception("Consulta nao encontrada");

        consultationRepository.deleteById(id);
    }

    private ValidatedDTO validPayload(ConsultationDTO data) throws Exception {
        Optional<PatientModel> foundPatient = patientRepository.findById(data.patientId());
        if (foundPatient.isEmpty())
            throw new Exception("Paciente não encontrado");

        Optional<MedicModel> foundMedic = medicRepositroy.findById(data.medicId());
        if (foundMedic.isEmpty())
            throw new Exception("Médico não encontrado");

        Optional<SecretaryModel> foundSecretary = secretaryRepository.findById(data.secretaryId());
        if (foundSecretary.isEmpty())
            throw new Exception("Secretária não encontrada");

        ValidatedDTO validatedDTO = new ValidatedDTO(foundPatient.get(), foundMedic.get(), foundSecretary.get());
        return validatedDTO;
    }
}
