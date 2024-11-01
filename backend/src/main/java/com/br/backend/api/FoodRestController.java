package com.br.backend.api;

import com.br.backend.model.Food;
import com.br.backend.repository.FoodRepository;
import com.br.backend.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
    public ResponseEntity<Food> updateAmount(@PathVariable Long id, @RequestBody Map<String, Integer> request) {
        Integer amountToAdd = request.get("amount"); // Obtemos a quantidade a ser adicionada
        Optional<Food> foodOptional = foodRepository.findById(id); // Busca o alimento pelo ID

        if (foodOptional.isPresent()) {
            Food food = foodOptional.get(); // Obtém o alimento
            food.setAmount(food.getAmount() + amountToAdd); // Soma a nova quantidade à quantidade existente
            foodRepository.save(food); // Salva a nova quantidade no banco de dados
            return ResponseEntity.ok(food); // Retorna o alimento atualizado
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Retorna NOT FOUND se o alimento não existir
        }
    }
}
