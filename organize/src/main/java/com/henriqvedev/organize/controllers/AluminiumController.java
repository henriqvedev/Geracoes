package com.henriqvedev.organize.controllers;

import com.henriqvedev.organize.entities.Aluminium;
import com.henriqvedev.organize.service.AluminiumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/aluminium")
@CrossOrigin(origins = "http://localhost:63342") //mecanismo de seg do navegador
public class AluminiumController {

    @Autowired
    private AluminiumService aluminiumService;

    @GetMapping //Todos os aluminios
    public List<Aluminium> findAll(){
        return aluminiumService.findAll();
    }

    @GetMapping ("/{id}") //Aluminio por ID
    public ResponseEntity<Aluminium> findById(@PathVariable Long id){
        Aluminium aluminium = aluminiumService.findById(id);
                return ResponseEntity.ok(aluminium);
    }

    @PostMapping //Insere aluminios
    public ResponseEntity<Aluminium> create(@RequestBody Aluminium aluminium){
        Aluminium saved = aluminiumService.save(aluminium);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @DeleteMapping("/{id}")//Deletar aluminios por id
    public ResponseEntity<Void> deleteById(@PathVariable Long id){
        aluminiumService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}") //Atualize Aluminio
    public Aluminium update(@PathVariable Long id, @RequestBody Aluminium obj) {
        return aluminiumService.update(id, obj);
    }


}


