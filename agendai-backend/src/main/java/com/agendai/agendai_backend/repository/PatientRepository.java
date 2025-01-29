package com.agendai.agendai_backend.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.agendai.agendai_backend.model.PatientModel;

public interface PatientRepository extends JpaRepository<PatientModel, UUID> {

    Optional<PatientModel> findByCpf(String cpf);

    Optional<PatientModel> findByEmail(String email);

    Optional<PatientModel> findByName(String name);

    Optional<PatientModel> findById(UUID id);
}
