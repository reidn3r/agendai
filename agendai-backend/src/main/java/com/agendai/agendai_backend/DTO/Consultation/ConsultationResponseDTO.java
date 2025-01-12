package com.agendai.agendai_backend.DTO.Consultation;

import java.time.LocalDateTime;
import java.util.UUID;

import com.agendai.agendai_backend.model.ConsultationModel;

public record ConsultationResponseDTO(
        UUID id,
        LocalDateTime data,
        UUID secretaryId,
        String secretaryName,
        UUID medicId,
        String medicName,
        UUID patientId,
        String patientName) {
    public static ConsultationResponseDTO fromModel(ConsultationModel model) {
        return new ConsultationResponseDTO(
                model.getId(),
                model.getDate(),
                model.getSecretary().getId(),
                model.getSecretary().getName(),
                model.getMedic().getId(),
                model.getMedic().getName(),
                model.getPatient().getId(),
                model.getPatient().getNome());
    }
}
