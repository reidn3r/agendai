package com.agendai.agendai_backend.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.agendai.agendai_backend.model.SecretaryModel;

public interface SecretaryRepository extends JpaRepository<SecretaryModel, UUID> {

    Optional<SecretaryModel> findByCpf(String cpf);

}
