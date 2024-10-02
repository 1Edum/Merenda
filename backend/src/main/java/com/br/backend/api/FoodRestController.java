package com.br.backend.api;

import com.br.backend.model.Food;
import com.br.backend.repository.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/food")
public class FoodRestController {

    @Autowired
    private FoodRepository foodRepository;

    @GetMapping("/listar")
    public List<Food> listar() {
        return foodRepository.findAll();
    }

    @PostMapping("/inserir")
    public void inserir(@RequestBody Food food) {
        foodRepository.save(food);
    }

    @PostMapping("/inserir-varios")
    public void inserirVarios(@RequestBody List<Food> foods) {
        foodRepository.saveAll(foods);
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<Void> deletar(@PathVariable("id") Long id) {
        Optional<Food> existingFood = foodRepository.findById(id);
        if (existingFood.isPresent()) {
            foodRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
