package com.br.backend.api;

import com.br.backend.model.SelectFood;
import com.br.backend.repository.SelectFoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/select-food")
public class SelectFoodController {

    @Autowired
    private SelectFoodRepository selectFoodRepository;

    @GetMapping
    public List<SelectFood> ListFoods(){
        return selectFoodRepository.findAll();
    }

    @PostMapping("/user-select")
    public void SelectFood(@RequestBody SelectFood selectFood){
        selectFoodRepository.save(selectFood);

    }
}
