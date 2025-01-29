package com.agendai.agendai_backend.model;

import java.time.LocalDateTime;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.annotation.Nullable;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tb_consultation")
public class ConsultationModel {
    // Classe de Consultas

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @NotNull
    private LocalDateTime date;

    @Value("${estado:PENDENTE}")
    private String estado;

    @ManyToOne
    @JsonBackReference
    SecretaryModel secretary;

    @ManyToOne
    @JsonBackReference
    MedicModel medic;

    @ManyToOne
    @JsonBackReference
    PatientModel patient;

    @OneToOne
    @Nullable
    @JsonBackReference
    private CandidatesModel candidate;

}
