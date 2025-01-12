package com.agendai.agendai_backend.DTO.Consultation;

import com.agendai.agendai_backend.model.MedicModel;
import com.agendai.agendai_backend.model.PatientModel;
import com.agendai.agendai_backend.model.SecretaryModel;

import lombok.Data;

@Data
public class ValidatedDTO {
    private final PatientModel patient;
    private final MedicModel medic;
    private final SecretaryModel secretary;

    public ValidatedDTO(PatientModel patient, MedicModel medic, SecretaryModel secretary) {
        this.patient = patient;
        this.medic = medic;
        this.secretary = secretary;
    }
}
