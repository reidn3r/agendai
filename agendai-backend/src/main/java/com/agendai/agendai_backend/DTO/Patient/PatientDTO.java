package com.agendai.agendai_backend.DTO.Patient;

import java.time.LocalDate;

import org.hibernate.validator.constraints.br.CPF;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

public record PatientDTO(
        @NotNull String nome,
        @NotNull @Email String email,
        @NotNull @CPF String cpf,
        @NotNull LocalDate dataNascimento,
        @NotNull String telefone) {
}
