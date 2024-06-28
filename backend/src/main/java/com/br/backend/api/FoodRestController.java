package com.br.backend.api;

import com.br.backend.model.Food;
import com.br.backend.repository.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/food")
public class FoodRestController {
    @Autowired
    private FoodRepository foodRepository;
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/listar")
        public List<Food> listar(){
        return foodRepository.findAll();
    }
    @PostMapping("/inserir")
        public  void inserir(@RequestBody Food food){
        foodRepository.save(food);
    }


}
