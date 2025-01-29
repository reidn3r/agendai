package com.agendai.agendai_backend.DTO.Consultation;

import java.time.LocalDateTime;
import java.util.UUID;

import com.agendai.agendai_backend.model.ConsultationModel;
import lombok.Builder;

@Builder
public record ConsultationResponseDTO(
        UUID id,
        LocalDateTime data,
        String estado,
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
                model.getEstado(),
                model.getSecretary().getId(),
                model.getSecretary().getName(),
                model.getMedic().getId(),
                model.getMedic().getName(),
                model.getPatient().getId(),
                model.getPatient().getNome());
    }
}
