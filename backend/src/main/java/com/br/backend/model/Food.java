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

    @ElementCollection
    private List<String> categories;

    private int calories;
    private String nutritionalValue;
    private String imageUrl;
    private boolean active;
    @Column(nullable = false, columnDefinition = "int default 0")
    private int amount;
}
