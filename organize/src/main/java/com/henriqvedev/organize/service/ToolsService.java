package com.henriqvedev.organize.service;

import com.henriqvedev.organize.entities.Tools;
import com.henriqvedev.organize.repositories.ToolsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ToolsService {

    @Autowired
    private ToolsRepository toolsRepository;

    public List<Tools> findAll(){ //Buscar todas ferramentas
        List<Tools> result = toolsRepository.findAll();
        return result;
    }

    public Tools save (Tools tools){ // Inserir Ferro
        return toolsRepository.save(tools);
    }


}
