package com.agendai.agendai_backend.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.agendai.agendai_backend.model.ConsultationModel;

public interface ConsultationRepository extends JpaRepository<ConsultationModel, UUID> {
    List<ConsultationModel> findAllByPatient_Id(UUID id);

    boolean existsByPatient_IdAndDate(UUID patientId, LocalDateTime date);

    Optional<ConsultationModel> findByMedic_IdAndDate(UUID medicId, LocalDateTime date);

    List<ConsultationModel> findBySecretaryId(UUID secretaryId);
}
