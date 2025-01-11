package com.agendai.agendai_backend.model;

import java.util.List;
import java.util.UUID;

import org.hibernate.validator.constraints.br.CPF;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data

@Entity
@Table(name = "tb_medic")
public class MedicModel {
    // Tabela Medic

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @NotNull
    private String name;

    @CPF
    @NotNull
    private String cpf;

    @NotNull
    private String status; // ?

    @OneToMany(mappedBy = "medic")
    List<ConsultationModel> consultations;
}
