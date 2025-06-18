package com.henriqvedev.organize.controllers;

import com.henriqvedev.organize.entities.Tools;
import com.henriqvedev.organize.service.ToolsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/tools")
public class ToolsController {

    @Autowired
    private ToolsService toolsService;

    @GetMapping //todas ferramenta
    public List<Tools> findAll(){
        return toolsService.findAll();
    }

    @PostMapping //criar ferramenta
    public ResponseEntity<Tools> create(@RequestBody Tools tools){
        Tools saved = toolsService.save(tools);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

}
