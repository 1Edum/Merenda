package com.br.backend.repository;

import com.br.backend.model.Waste;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WasteRepository extends JpaRepository<Waste, Long> {
}
