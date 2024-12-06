package com.br.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ListIndexBase;

import java.sql.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class SelectFood {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(
            name = "food_select",
            joinColumns = @JoinColumn(name = "select_id"),
            inverseJoinColumns = @JoinColumn(name = "food_id")
    )
    private List<Food> foods;

    @OneToOne(cascade = CascadeType.ALL)
    private User user;

    private Boolean selected = false;

    @Basic
    @Temporal(TemporalType.DATE)
    private Date dateSelect;

}
