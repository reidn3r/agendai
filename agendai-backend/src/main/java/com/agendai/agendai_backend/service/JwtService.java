package com.agendai.agendai_backend.service;

import com.agendai.agendai_backend.model.UserModel;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    @Value("${api.security.token.secret}")
    private String secretKey;

    @Value("${api.security.token.expiration}")
    private long jwtExpiration;

    // Gera o token com claims extras
    public String generateToken(UserModel user) {
        Map<String, Object> extraClaims = new HashMap<>();
        
        extraClaims.put("nome", user.getName());
        extraClaims.put("email", user.getEmail());
        // Adicione outros campos conforme necessário
        // extraClaims.put("type", user.getRole());

        return buildToken(extraClaims, user);
    }

    private String buildToken(Map<String, Object> extraClaims, UserModel user) {
        return Jwts.builder()
                .setClaims(extraClaims)
                .setSubject(user.getEmail())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // Valida se o token pertence ao usuário e se não expirou
    public boolean isTokenValid(String token, UserModel user) {
        final String username = extractUsername(token);
        return (username.equals(user.getEmail())) && !isTokenExpired(token);
    }

    // Extrai o username (email) do token
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // Extrai um claim específico
    public String extractClaim(String token, String claimName) {
        final Claims claims = extractAllClaims(token);
        return claims.get(claimName, String.class);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}