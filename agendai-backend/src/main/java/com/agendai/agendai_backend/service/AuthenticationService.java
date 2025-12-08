package com.agendai.agendai_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.agendai.agendai_backend.DTO.Auth.AuthResponse;
import com.agendai.agendai_backend.DTO.Auth.UserResponse;
import com.agendai.agendai_backend.DTO.Login.LoginDTO;
import com.agendai.agendai_backend.model.UserModel;
import com.agendai.agendai_backend.repository.UserRepository;

@Service
public class AuthenticationService {
    
    @Autowired
    private UserRepository userRepo;

    @Autowired
    private JwtService jwtService;

    public AuthResponse login(LoginDTO login) {
        UserModel user = userRepo.findByEmail(login.getUsername());

        
        System.err.println("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
        System.err.println("--------------------------------------------------------------------");
        System.err.println(login.getUsername());
        System.err.println(login.getPassword());
        System.err.println("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");

        if (user == null) {
            throw new RuntimeException("Usuário não encontrado");
        }

        System.err.println("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
        System.err.println("--------------------------------------------------------------------");
        System.err.println(user.getName());
        System.err.println(login.getUsername());
        System.err.println(user.getPassword());
        System.err.println(login.getPassword());
        System.err.println("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");

        if (!user.checkPassword(login.getPassword())) {
            throw new RuntimeException("Senha inválida");
        }

        String token = jwtService.generateToken(user);

        // Criar UserResponse
        UserResponse userResponse = new UserResponse(
            user.getName(),
            getUserType(user), // Método para determinar o tipo do usuário
            user.getEmail()
        );

        // Criar AuthResponse com token e user
        AuthResponse res = new AuthResponse(token, userResponse);

        System.err.println("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");

        return res;
    }

    public UserResponse getCurrentUser(String token) {
        try {
            // Extrair email do token
            String email = jwtService.extractUsername(token);
            
            // Buscar usuário no banco
            UserModel user = userRepo.findByEmail(email);
            
            if (user == null) {
                throw new RuntimeException("Usuário não encontrado");
            }

            // Validar se o token é válido para este usuário
            if (!jwtService.isTokenValid(token, user)) {
                throw new RuntimeException("Token inválido ou expirado");
            }

            // Retornar dados do usuário
            return new UserResponse(
                user.getName(),
                getUserType(user),
                user.getEmail()
            );
        } catch (Exception e) {
            throw new RuntimeException("Erro ao buscar usuário: " + e.getMessage());
        }
    }

    // Método auxiliar para determinar o tipo do usuário
    // AJUSTE CONFORME SUA LÓGICA DE NEGÓCIO
    private String getUserType(UserModel user) {
        // Opção 1: Se você tem um campo "role" no UserModel
        // return user.getRole();
        
        // Opção 2: Se você tem uma tabela de roles
        // return user.getRole().getName();
        
        // Opção 3: Lógica customizada (exemplo)
        // if (user.isAdmin()) return "ADMIN";
        // return "SECRETARIA";
        
        // Temporário: retorna sempre SECRETARIA
        // IMPORTANTE: Substitua isso pela sua lógica real!
        return "SECRETARIA";
    }
}