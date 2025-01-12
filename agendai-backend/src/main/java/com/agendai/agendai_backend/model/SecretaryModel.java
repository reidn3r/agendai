package com.agendai.agendai_backend.model;

import java.util.List;
import java.util.UUID;

import org.hibernate.validator.constraints.br.CPF;

import com.agendai.agendai_backend.DTO.Professional.IProfessional;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tb_secretary")
public class SecretaryModel implements IProfessional {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @NotNull
    private String name;

    @NotNull
    @CPF
    private String cpf;

    @OneToMany(mappedBy = "secretary")
    @JsonIgnore // Referencia ciclica ao criar uma nova consulta
    private List<ConsultationModel> consultations;

    public SecretaryModel(String name, String cpf) {
        this.name = name;
        this.cpf = cpf;
    }
}
