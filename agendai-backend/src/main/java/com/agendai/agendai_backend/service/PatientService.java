package com.agendai.agendai_backend.service;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.agendai.agendai_backend.DTO.Patient.PatientDTO;
import com.agendai.agendai_backend.model.ConsultationModel;
import com.agendai.agendai_backend.model.PatientModel;
import com.agendai.agendai_backend.repository.ConsultationRepository;
import com.agendai.agendai_backend.repository.PatientRepository;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private ConsultationRepository consultationRepository;

    public PatientModel createPatient(PatientDTO data) throws Exception {
        if (this.isValidPatient(data)) {
            PatientModel newPatient = new PatientModel(null, data.nome(), data.email(), data.cpf(),
                    data.dataNascimento(), data.telefone(), null, null, null);

            return patientRepository.save(newPatient);
        }
        return null;
    }

    public UUID deletePatientById(UUID id) throws Exception {
        Optional<PatientModel> foundPatient = patientRepository.findById(id);
        if (foundPatient.isEmpty())
            throw new Exception("Paciente nao encontrado");

        patientRepository.deleteById(id);
        return id;
    }

    public Page<ConsultationModel> getPatientConsultationsByPage(UUID id, int page) throws Exception {
        Optional<PatientModel> foundPatient = patientRepository.findById(id);
        if (foundPatient.isEmpty())
            throw new Exception("Paciente nao encontrado");

        // Cada página contém 10 consultas
        PageRequest pageRequest = PageRequest.of(page, 10);
        return consultationRepository.findById(id, pageRequest);
    }

    private boolean isValidPatient(PatientDTO data) throws Exception {
        Optional<PatientModel> foundByCpf = patientRepository.findByCpf(data.cpf());
        if (foundByCpf.isPresent())
            throw new Exception("CPF já cadastrado");

        Optional<PatientModel> foundByEmail = patientRepository.findByCpf(data.email());
        if (foundByEmail.isPresent())
            throw new Exception("Email já cadastrado");

        return true;
    }

}
