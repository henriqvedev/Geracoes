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
public class AluminiumController {

    @Autowired
    private AluminiumService aluminiumService;

    @GetMapping //todos os aluminios
    public List<Aluminium> findAll(){
        return aluminiumService.findAll();
    }

    @PostMapping //Insere aluminios
    public ResponseEntity<Aluminium> create(@RequestBody Aluminium aluminium){
        Aluminium saved = aluminiumService.save(aluminium);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

}


