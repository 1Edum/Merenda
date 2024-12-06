package com.br.backend.repository;

import com.br.backend.model.SelectFood;
import com.br.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.sql.Date;
import java.util.Optional;

public interface SelectFoodRepository extends JpaRepository<SelectFood, Long> { // Changed to Long
    Optional<SelectFood> findByUserAndDateSelect(User user, Date dateSelect);
}