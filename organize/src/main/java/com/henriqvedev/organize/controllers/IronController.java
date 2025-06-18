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
public class IronController {

    @Autowired
    private IronService ironService;

    @GetMapping //todos os ferros
    public List<Iron> findAll(){
        return ironService.findAll();
    }

    @PostMapping //Insere Ferros
    public ResponseEntity<Iron> create(@RequestBody Iron iron){
        Iron saved = ironService.save(iron);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

}
