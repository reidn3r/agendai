package com.agendai.agendai_backend.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.agendai.agendai_backend.model.ConsultationModel;

public interface ConsultationRepository extends JpaRepository<ConsultationModel, UUID> {

}
