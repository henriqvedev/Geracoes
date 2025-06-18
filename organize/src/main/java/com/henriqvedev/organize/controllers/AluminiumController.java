package com.henriqvedev.organize.controllers;

import com.henriqvedev.organize.entities.Aluminium;
import com.henriqvedev.organize.service.AluminiumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/games")
public class AluminiumController {

    @Autowired
    private AluminiumService aluminiumService;

    @GetMapping
    public List<Aluminium> findAll(){
        List<Aluminium> result = aluminiumService.findAll();
        return result;

    }

}
