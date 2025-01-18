package com.agendai.agendai_backend.DTO.Notification;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import com.agendai.agendai_backend.DTO.Patient.PatientResponseDTO;
import com.agendai.agendai_backend.model.NotificationModel;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NotificationResponseDTO {
    private UUID id;
    private String message;
    private String tipo;
    private List<PatientResponseDTO> patients;

    // Construtor para converter de NotificationModel para DTO
    public NotificationResponseDTO(NotificationModel notification) {
        this.id = notification.getId();
        this.message = notification.getMessage();
        this.tipo = notification.getTipo();
        this.patients = notification.getPatients()
                .stream()
                .map(PatientResponseDTO::new)
                .collect(Collectors.toList());
    }
}
