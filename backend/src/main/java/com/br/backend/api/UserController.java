package com.br.backend.api;



import com.br.backend.model.User;
import com.br.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/listar")
    public List<User> listar() {
        return userRepository.findAll();
    }

    @PostMapping("/inserir")
    public ResponseEntity<User> inserir(@RequestBody User users) {
        User savedUser = userRepository.save(users);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    @PostMapping("/inserir-varios")
    public ResponseEntity<Void> inserirVarios(@RequestBody List<User> users) {
        userRepository.saveAll(users);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<Void> deletar(@PathVariable("id") Long id) {
        Optional<User> existingFood = userRepository.findById(id);
        if (existingFood.isPresent()) {
            userRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
