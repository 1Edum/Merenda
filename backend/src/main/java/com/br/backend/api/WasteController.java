package com.br.backend.api;

import com.br.backend.model.Food;
import com.br.backend.model.Waste;
import com.br.backend.repository.WasteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/waste")
public class WasteController {

    @Autowired
    private WasteRepository wasteRepository;

    @GetMapping("/listar")
    public List<Waste> listar() {
        return wasteRepository.findAll();
    }

    @PostMapping("/inserir")
    public ResponseEntity<Waste> inserir(@RequestBody Waste waste) {
        Waste wasteInserido = wasteRepository.save(waste);
        return ResponseEntity.ok(wasteInserido);
    }

}
