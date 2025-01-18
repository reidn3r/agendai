package com.agendai.agendai_backend.model;

import java.util.UUID;

import org.hibernate.validator.constraints.br.CPF;

import com.agendai.agendai_backend.DTO.User.UserRole;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tb_user")
public class UserModel {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @NotNull
    private String email;

    @NotNull
    private String password; // Precisa ser armazenado com hash

    @Enumerated(EnumType.STRING)
    private UserRole role; // SECRETARY ou ADMIN

    @NotNull
    @CPF
    private String cpf; // Relaciona com secretária ou admin

    @OneToOne
    @JoinColumn(name = "secretary_id")
    private SecretaryModel secretary;

    public UserModel(String email, String password, UserRole role, String cpf, SecretaryModel secretary) {
        this.email = email;
        this.password = password;
        this.role = role;
        this.cpf = cpf;
        this.secretary = secretary;
    }
}