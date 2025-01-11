package com.agendai.agendai_backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.agendai.agendai_backend.DTO.Professional.IProfessional;
import com.agendai.agendai_backend.DTO.Professional.ProfessionalDTO;
import com.agendai.agendai_backend.DTO.Professional.ProfessionalType;
import com.agendai.agendai_backend.model.MedicModel;
import com.agendai.agendai_backend.model.SecretaryModel;
import com.agendai.agendai_backend.repository.MedicRepositroy;
import com.agendai.agendai_backend.repository.SecretaryRepository;

@Service
public class ProfessionalService {

    @Autowired
    private MedicRepositroy medicRepositroy;

    @Autowired
    private SecretaryRepository secretaryRepository;

    public IProfessional createProfessional(ProfessionalDTO data) throws Exception {
        Optional<MedicModel> foundMedic = medicRepositroy.findByCpf(data.cpf());
        Optional<SecretaryModel> foundSecretary = secretaryRepository.findByCpf(data.cpf());

        if (foundMedic.isPresent() || foundSecretary.isPresent())
            throw new Exception("Profissional ja cadastrado");

        if (data.type() == ProfessionalType.MEDICO) {
            return this.createMedic(data);
        }
        return this.createSecretary(data);
    }

    public List<MedicModel> getMedicList() {
        return medicRepositroy.findAll();
    }

    public List<SecretaryModel> getSecretaryList() {
        return secretaryRepository.findAll();
    }

    private MedicModel createMedic(ProfessionalDTO data) throws Exception {
        MedicModel newMedic = new MedicModel(data.nome(), data.cpf());
        return medicRepositroy.save(newMedic);
    }

    private SecretaryModel createSecretary(ProfessionalDTO data) throws Exception {
        SecretaryModel newSecretary = new SecretaryModel(data.nome(), data.cpf());
        return secretaryRepository.save(newSecretary);
    }

}
