package com.br.backend.controller;


import com.br.backend.model.Food;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/food")
public class FoodController {
    /*
     * Método de acesso à página http://localhost:8080/aluno/novo
     */
    @GetMapping("/new")
    public String cadastrar(Model model){
        // Adiciona um objeto Food vazio para ser carregado no formulário
        model.addAttribute("food", new Food());

        // Retorna o template food/inserir.html
        return "food/inserir";
    }

}
