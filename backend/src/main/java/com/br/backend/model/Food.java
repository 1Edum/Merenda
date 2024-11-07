package com.br.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class Food {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @ElementCollection // Define que categories será uma coleção embutida
    private List<String> categories; // Alterado de String para List<String>

    private int calories;
    private String nutritionalValue;
    private String imageUrl;
    private boolean active;
    private int amount;
}
