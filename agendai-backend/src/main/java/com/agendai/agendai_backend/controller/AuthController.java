package com.agendai.agendai_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.agendai.agendai_backend.DTO.Auth.AuthResponse;
import com.agendai.agendai_backend.DTO.Auth.UserResponse;
import com.agendai.agendai_backend.DTO.Login.LoginDTO;
import com.agendai.agendai_backend.service.AuthenticationService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") // Configure conforme necessário
public class AuthController {
    
    @Autowired
    private AuthenticationService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO login) {
        AuthResponse res = authService.login(login);
        return ResponseEntity.ok(res);
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(HttpServletRequest request) {
        String token = extractToken(request);
        
        if (token == null) {
            return ResponseEntity.status(401).body("Token não fornecido");
        }
        
        UserResponse user = authService.getCurrentUser(token);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        // Como estamos usando JWT stateless, o logout é feito no frontend
        // Mas você pode adicionar lógica de blacklist de tokens aqui se necessário
        return ResponseEntity.ok().body("Logout realizado com sucesso");
    }

    private String extractToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}