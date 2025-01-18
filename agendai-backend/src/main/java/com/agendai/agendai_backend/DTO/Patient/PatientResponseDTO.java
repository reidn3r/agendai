package com.agendai.agendai_backend.DTO.Patient;

import java.util.UUID;

import com.agendai.agendai_backend.model.PatientModel;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PatientResponseDTO {
    private UUID id;
    private String nome;
    private String email;

    public PatientResponseDTO(PatientModel patient) {
        this.id = patient.getId();
        this.nome = patient.getNome();
        this.email = patient.getEmail();
    }
}
