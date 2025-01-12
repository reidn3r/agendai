package com.agendai.agendai_backend.repository;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.agendai.agendai_backend.model.ConsultationModel;

public interface ConsultationRepository extends JpaRepository<ConsultationModel, UUID> {
    Page<ConsultationModel> findById(UUID id, Pageable pageable);

    boolean existsByPatient_IdAndDate(UUID patientId, LocalDateTime date);

    Optional<ConsultationModel> findByMedic_IdAndDate(UUID medicId, LocalDateTime date);
}
