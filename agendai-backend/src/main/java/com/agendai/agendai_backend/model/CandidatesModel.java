package com.agendai.agendai_backend.model;

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
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tb_candidates")
public class CandidatesModel {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private int ranking;

    @ManyToOne
    PatientModel patient;

    @OneToOne
    @Nullable
    @JsonBackReference
    private ConsultationModel consultation;
}
