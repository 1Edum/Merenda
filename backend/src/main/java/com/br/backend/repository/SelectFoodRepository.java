package com.br.backend.repository;

import com.br.backend.model.SelectFood;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SelectFoodRepository extends JpaRepository<SelectFood, Integer> {
}
