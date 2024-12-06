package com.br.backend.api;

import com.br.backend.model.Food;
import com.br.backend.repository.FoodRepository;
import com.br.backend.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/food")
public class FoodRestController {

    @Autowired
    private FoodService foodService;

    @Autowired
    private FoodRepository foodRepository;

    @GetMapping("/listar")
    public List<Food> listar() {
        return foodRepository.findAll();
    }

    @PostMapping("/inserir")
    public ResponseEntity<Food> inserirFood(@RequestBody Food food) {
        Food savedFood = foodService.saveFood(food); // Salva o objeto food, incluindo a URL da imagem
        return ResponseEntity.status(201).body(savedFood);
    }

    @PostMapping("/inserir-varios")
    public void inserirVarios(@RequestBody List<Food> foods) {
        foodRepository.saveAll(foods);
    }

    @PutMapping("/modificar")
    public ResponseEntity<Food> modificarFood(@RequestBody Food food)
    { Optional<Food> existingFood = foodRepository.findById(food.getId());
        if (existingFood.isPresent()) { Food updatedFood = existingFood.get();
            updatedFood.setName(food.getName()); updatedFood.setCategories(food.getCategories());
            updatedFood.setCalories(food.getCalories()); updatedFood.setNutritionalValue(food.getNutritionalValue());
            updatedFood.setImageUrl(food.getImageUrl()); Food savedFood = foodRepository.save(updatedFood);
            return ResponseEntity.ok(savedFood); }
        else { return ResponseEntity.notFound().build(); } }

    @PatchMapping("/modificar-categorias")
    public ResponseEntity<Food> modificarCategorias(@RequestBody Map<String, Object> updates) {
        Long id = ((Number) updates.get("id")).longValue();
        Optional<Food> existingFood = foodRepository.findById(id);

        if (existingFood.isPresent()) {
            Food food = existingFood.get();
            if (updates.containsKey("categories")) {
                food.setCategories((List<String>) updates.get("categories"));
            }
            Food updatedFood = foodRepository.save(food);
            return ResponseEntity.ok(updatedFood);
        } else {
            return ResponseEntity.notFound().build();
        }
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

    @PutMapping("/active-true/{active}")
    public void active(@PathVariable Boolean active,@RequestBody Food food){
        Food food1 = foodRepository.getOne(food.getId());
        if(active == Boolean.TRUE){
            food1.setActive(false);
        }else{
            food1.setActive(Boolean.TRUE);
        }
        foodRepository.save(food1);
    }

    @PutMapping("/update-amount/{id}")
    public ResponseEntity<Food> updateAmount(
            @PathVariable Long id,
            @RequestBody Map<String, Integer> request) {
        // Validar o valor de entrada
        Integer amountToAdd = request.get("amount");
        if (amountToAdd == null || amountToAdd <= 0) {
            return ResponseEntity.badRequest().build();
        }
        // Buscar o alimento pelo ID e lançar exceção caso não exista
        Food food = foodRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Food not found"));
        // Atualizar a quantidade e salvar
        int newAmount = food.getAmount() + amountToAdd;
        if (newAmount < 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build(); // Protege contra valores negativos
        }
        food.setAmount(newAmount);
        foodRepository.save(food);

        return ResponseEntity.ok(food);
    }}

