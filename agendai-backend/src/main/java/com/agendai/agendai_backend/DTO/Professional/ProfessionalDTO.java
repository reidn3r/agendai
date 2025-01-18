package com.agendai.agendai_backend.DTO.Professional;

import org.hibernate.validator.constraints.br.CPF;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

public record ProfessionalDTO(
        @NotNull String name,
        @NotNull @CPF String cpf,
        @NotNull ProfessionalType type,
        @Nullable @Email String email,
        @Nullable String password) {
}
