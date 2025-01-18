package com.agendai.agendai_backend.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class PasswordService {

    private final static BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public String hashPassword(String text) {
        return encoder.encode(text);
    }

    // Verificar se a senha corresponde ao hash
    public boolean passwordMatches(String plainPassword, String hashedPassword) {
        return encoder.matches(plainPassword, hashedPassword);
    }
}
