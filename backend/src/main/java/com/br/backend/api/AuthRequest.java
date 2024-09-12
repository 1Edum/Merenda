package com.br.backend.api;

public class AuthRequest {
    private String username;
    private String password;

    // Construtor padrão
    public AuthRequest() {
    }

    // Construtor com parâmetros
    public AuthRequest(String username, String password) {
        this.username = username;
        this.password = password;
    }

    // Getters e Setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
