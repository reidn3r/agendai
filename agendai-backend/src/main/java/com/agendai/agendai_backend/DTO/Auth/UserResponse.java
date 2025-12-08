package com.agendai.agendai_backend.DTO.Auth;

import java.util.UUID; // Não esqueça de importar

public class UserResponse {
    private UUID id; // <--- Novo campo
    private String nome;
    private String type;
    private String email;

    public UserResponse() {}

    // Atualize o construtor
    public UserResponse(UUID id, String nome, String type, String email) {
        this.id = id;
        this.nome = nome;
        this.type = type;
        this.email = email;
    }

    // Getters e Setters para o ID
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    // ... (Mantenha os outros getters e setters de nome, type, email) ...
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}