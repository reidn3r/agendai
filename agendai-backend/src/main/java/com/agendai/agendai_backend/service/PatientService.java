package com.agendai.agendai_backend.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
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

    public List<ConsultationModel> getPatientConsultationsByPage(String email) throws Exception {
        Optional<PatientModel> foundPatient = patientRepository.findByEmail(email);
        if (foundPatient.isEmpty())
            throw new Exception("Paciente nao encontrado");

        return consultationRepository.findAllByPatient_Id(foundPatient.get().getId());
    }

    public List<PatientModel> getPatientList() {
        return patientRepository.findAll();
    }

    public Optional<PatientModel> getPatientByEmail(String email) {
        return patientRepository.findByEmail(email);
    }

    public Optional<PatientModel> getPatientByName(String nome) {
        return patientRepository.findByNome(nome);
    }

    private boolean isValidPatient(PatientDTO data) throws Exception {
        Optional<PatientModel> foundByCpf = patientRepository.findByCpf(data.cpf());
        if (foundByCpf.isPresent())
            throw new Exception("CPF já cadastrado");

        Optional<PatientModel> foundByEmail = patientRepository.findByEmail(data.email());
        if (foundByEmail.isPresent())
            throw new Exception("Email já cadastrado");

        return true;
    }

}
