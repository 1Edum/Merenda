package com.br.backend.service;

import com.br.backend.model.Food;
import com.br.backend.repository.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FoodService {

    @Autowired
    private FoodRepository foodRepository;

    public Food saveFood(Food food) {
        return foodRepository.save(food);
    }

    // Outros métodos de manipulação de Food, como findById, findAll, etc.
}
