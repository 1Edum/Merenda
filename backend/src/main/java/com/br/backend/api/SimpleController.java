package com.br.backend.api;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("")
public class SimpleController {

    @PreAuthorize("hasRole('Administrator')")
    @GetMapping("/admin")
    public ResponseEntity<String> helloAdmin(){
        return ResponseEntity.ok("");
    }

    @PreAuthorize("hasRole('Student')")
    @GetMapping("/student")
    public ResponseEntity<String> helloUser(){
        return ResponseEntity.ok("");
    }

    @PreAuthorize("hasRole('Kitchen')")
    @GetMapping("/kitchen")
    public ResponseEntity<String> helloKitchen(){
        return ResponseEntity.ok("");
    }
}
