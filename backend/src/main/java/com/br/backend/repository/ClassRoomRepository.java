package com.br.backend.repository;

import com.br.backend.model.ClassRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClassRoomRepository extends JpaRepository<ClassRoom, Long> {
    ClassRoom findByName(String name);
}
