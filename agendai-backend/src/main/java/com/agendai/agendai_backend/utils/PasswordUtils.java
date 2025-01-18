package com.agendai.agendai_backend.utils;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class PasswordUtils {
    private final static BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public static String hashPassword(String text) {
        return encoder.encode(text);
    }

    // Verificar se a senha corresponde ao hash
    public static boolean passwordMatches(String plainPassword, String hashedPassword) {
        return encoder.matches(plainPassword, hashedPassword);
    }
}
