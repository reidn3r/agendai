package com.agendai.agendai_backend.DTO.Login;

import lombok.Data;

@Data // Gera Getters, Setters, ToString, etc. automaticamente
public class LoginDTO {
    private String username;
    private String password;
}