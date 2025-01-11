package com.agendai.agendai_backend.model;

import java.time.LocalDate;
import java.util.UUID;

import jakarta.annotation.Nullable;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data

@Entity
@Table(name = "tb_consultation")
public class ConsultationModel {
    // Classe de Consultas

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @NotNull
    private LocalDate data;

    @NotNull
    private String status;

    // @CreatedDate
    // @Column(name = "created_at", updatable = false)
    // private Instant createdAt;

    @ManyToOne
    SecretaryModel secretary;

    @ManyToOne
    MedicModel medic;

    @ManyToOne
    PatientModel patient;

    @OneToOne
    @Nullable
    private CandidatesModel candidate;

}
