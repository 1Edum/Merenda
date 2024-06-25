package com.br.backend.repository;

import com.br.backend.model.Food;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodRepository  extends JpaRepository<Food, Long> {
}
