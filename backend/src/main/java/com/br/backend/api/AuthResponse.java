package com.br.backend.api;

public class AuthResponse {
    private String token;

    // Construtor padrão
    public AuthResponse() {
    }

    // Construtor com parâmetro
    public AuthResponse(String token) {
        this.token = token;
    }

    // Getter e Setter
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
