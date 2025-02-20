package com.agendai.agendai_backend.model;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.hibernate.validator.constraints.br.CPF;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tb_patient")
public class PatientModel {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @NotNull
    private String nome;

    @Email
    @NotNull
    private String email;

    @CPF
    @NotNull
    @Size(max = 11)
    @Column(length = 11)
    private String cpf;

    @NotNull
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private LocalDate dataNascimento;
    // Substituí o campo int idade por Date dataNascimento

    @NotNull
    private String telefone;
    // Substituí o campo contato por telefone

    @JsonManagedReference
    @JsonIgnore
    @OneToMany(mappedBy = "patient")
    List<CandidatesModel> candidates;

    @JsonManagedReference
    // @JsonIgnore
    @OneToMany(mappedBy = "patient")
    List<ConsultationModel> consultations;

    @ManyToMany
    @JsonIgnore
    @JoinTable(name = "patient_notification", joinColumns = @JoinColumn(name = "patient_id"), inverseJoinColumns = @JoinColumn(name = "notification_id"))
    List<NotificationModel> notifications;
}
