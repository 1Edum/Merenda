package com.br.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class Food {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String category;
    private int calories;
    private String nutritionalValue;
    private String imageUrl; // Adicione este campo para a URL da imagem
    @Column(name = "active")
    private boolean active;


    public void setActive(boolean active) {
    }
}
