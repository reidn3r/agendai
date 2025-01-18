package com.agendai.agendai_backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.agendai.agendai_backend.DTO.Professional.IProfessional;
import com.agendai.agendai_backend.DTO.Professional.ProfessionalDTO;
import com.agendai.agendai_backend.DTO.Professional.ProfessionalType;
import com.agendai.agendai_backend.DTO.User.UserRole;
import com.agendai.agendai_backend.model.MedicModel;
import com.agendai.agendai_backend.model.SecretaryModel;
import com.agendai.agendai_backend.model.UserModel;
import com.agendai.agendai_backend.repository.MedicRepositroy;
import com.agendai.agendai_backend.repository.SecretaryRepository;
import com.agendai.agendai_backend.repository.UserRepository;

@Service
public class ProfessionalService {

    @Autowired
    private MedicRepositroy medicRepositroy;

    @Autowired
    private SecretaryRepository secretaryRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordService passwordService;

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

    public MedicModel deleteMedicByCPF(String cpf) throws Exception {
        Optional<MedicModel> foundMedic = medicRepositroy.findByCpf(cpf);

        if (!foundMedic.isPresent())
            throw new Exception("Profissional nao encontrado");

        medicRepositroy.deleteByCpf(cpf);
        return foundMedic.get();
    }

    @Transactional
    public SecretaryModel deleteSecretaryByCPF(String cpf) throws Exception {
        Optional<SecretaryModel> foundSecretary = secretaryRepository.findByCpf(cpf);

        if (!foundSecretary.isPresent())
            throw new Exception("Profissional nao encontrado");

        userRepository.deleteByCpf(cpf);
        secretaryRepository.deleteByCpf(cpf);
        return foundSecretary.get();
    }

    public List<MedicModel> getMedicList() {
        return medicRepositroy.findAll();
    }

    public List<SecretaryModel> getSecretaryList() {
        return secretaryRepository.findAll();
    }

    private MedicModel createMedic(ProfessionalDTO data) throws Exception {
        MedicModel newMedic = new MedicModel(data.name(), data.cpf());
        return medicRepositroy.save(newMedic);
    }

    @Transactional
    private SecretaryModel createSecretary(ProfessionalDTO data) throws Exception {
        SecretaryModel newSecretary = new SecretaryModel(data.name(), data.cpf());

        String hashedPassword = passwordService.hashPassword(data.password());

        SecretaryModel savedSecretary = secretaryRepository.save(newSecretary);
        UserModel user = new UserModel(
                data.email(),
                hashedPassword,
                UserRole.SECRETARY,
                data.cpf(),
                savedSecretary);

        userRepository.save(user);

        return savedSecretary;

    }

}
