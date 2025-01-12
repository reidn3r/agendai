package com.agendai.agendai_backend.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.agendai.agendai_backend.model.MedicModel;

public interface MedicRepositroy extends JpaRepository<MedicModel, UUID> {

    Optional<MedicModel> findByCpf(String cpf);

}
