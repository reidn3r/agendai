package com.agendai.agendai_backend.DTO.Consultation;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.validation.constraints.NotNull;

public record ConsultationDTO(
                @NotNull @DateTimeFormat LocalDateTime data,
                @NotNull UUID secretaryId,
                @NotNull UUID medicId,
                @NotNull UUID patientId) {

}
