package com.agendai.agendai_backend.DTO.Auth;

public class UserResponse {
    private String nome;
    private String type;
    private String email;

    public UserResponse() {}

    public UserResponse(String nome, String type, String email) {
        this.nome = nome;
        this.type = type;
        this.email = email;
    }

    // Getters e Setters
    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}