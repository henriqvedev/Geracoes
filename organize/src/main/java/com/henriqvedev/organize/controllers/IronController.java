package com.henriqvedev.organize.controllers;


import com.henriqvedev.organize.entities.Iron;
import com.henriqvedev.organize.service.IronService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/iron")
@CrossOrigin(origins = "http://localhost:8080") // mecanism de seg do navegador
public class IronController {

    @Autowired
    private IronService ironService;

    @GetMapping //Todos os ferros
    public List<Iron> findAll(){
        return ironService.findAll();
    }

    @GetMapping("/{id}") // Ferro por ID
    public ResponseEntity<Iron> findById(@PathVariable Long id){
        Iron iron = ironService.findById(id);
        return ResponseEntity.ok(iron);
    }

    @PostMapping //Insere Ferros
    public ResponseEntity<Iron> create(@RequestBody Iron iron){
        Iron saved = ironService.save(iron);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @DeleteMapping("/{id}") // Delete ferro por id
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        ironService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public Iron update(@PathVariable Long id, @RequestBody Iron obj) {
        return ironService.update(id, obj);
    }

}
