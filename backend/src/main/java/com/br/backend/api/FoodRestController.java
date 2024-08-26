package com.br.backend.api;

import com.br.backend.model.Food;
import com.br.backend.repository.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
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
    public ResponseEntity<Food> inserir(@RequestPart("food") Food food, @RequestPart("image") MultipartFile image) {
        try {
            // Defina o diretório onde o arquivo será salvo
            String directory = "uploads/";
            String fileName = image.getOriginalFilename();
            String filePath = directory + fileName;

            // Salve o arquivo no servidor
            File dest = new File(filePath);
            image.transferTo(dest);

            // Defina a URL da imagem na entidade Food
            food.setImageUrl("/uploads/" + fileName);

            // Salve a entidade Food no banco de dados
            Food savedFood = foodRepository.save(food);

            return new ResponseEntity<>(savedFood, HttpStatus.CREATED);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Inserir vários alunos
    @PostMapping("/inserir-varios")
    public void inserirVarios(@RequestBody List<Food> alunos) {foodRepository.saveAll(alunos);}

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
