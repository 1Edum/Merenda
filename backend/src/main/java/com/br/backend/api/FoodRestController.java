package com.br.backend.api;

import com.br.backend.model.Food;
import com.br.backend.repository.FoodRepository;
import com.br.backend.service.FirebaseStorageService;
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

    @Autowired
    private FirebaseStorageService firebaseStorageService;

    @GetMapping("/listar")
    public List<Food> listar() {
        return foodRepository.findAll();
    }

    @PostMapping("/inserir")
    public ResponseEntity<Food> inserir(@RequestPart("food") Food food, @RequestPart("image") MultipartFile image) {
        try {
            // Faça o upload da imagem para o Firebase e obtenha a URL pública
            String imageUrl = firebaseStorageService.uploadFile(image);

            // Defina a URL da imagem na entidade Food
            food.setImageUrl(imageUrl);

            // Salve a entidade Food no banco de dados
            Food savedFood = foodRepository.save(food);

            return new ResponseEntity<>(savedFood, HttpStatus.CREATED);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
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
