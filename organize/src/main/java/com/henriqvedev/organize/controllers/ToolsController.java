package com.henriqvedev.organize.controllers;

import com.henriqvedev.organize.entities.Iron;
import com.henriqvedev.organize.entities.Tools;
import com.henriqvedev.organize.service.ToolsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/tools")
@CrossOrigin(origins = "http://localhost:8080") // mecanism de seg do navegador
public class ToolsController {

    @Autowired
    private ToolsService toolsService;

    @GetMapping //Todas ferramenta
    public List<Tools> findAll(){
        return toolsService.findAll();
    }

    @GetMapping("/{id}") //Ferramenta por id
    public ResponseEntity<Tools> findById(@PathVariable Long id){
        Tools tools = toolsService.findById(id);
        return ResponseEntity.ok(tools);
    }

    @PostMapping //Criar ferramenta
    public ResponseEntity<Tools> create(@RequestBody Tools tools){
        Tools saved = toolsService.save(tools);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @DeleteMapping("/{id}") //Delete ferramenta por id
    public ResponseEntity<Void> deleteById(@PathVariable Long id){
        toolsService.deleteById(id);
        return ResponseEntity.noContent().build();

    }

    @PutMapping("/{id}") //Atualize ferramenta
    public Tools update(@PathVariable Long id, @RequestBody Tools obj) {
        return toolsService.update(id, obj);
    }



}
