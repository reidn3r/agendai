package com.agendai.agendai_backend.DTO.Professional;

import org.hibernate.validator.constraints.br.CPF;

import jakarta.validation.constraints.NotNull;

public record ProfessionalDTO(
                @NotNull String nome,
                @NotNull @CPF String cpf,
                @NotNull ProfessionalType type) {
}
