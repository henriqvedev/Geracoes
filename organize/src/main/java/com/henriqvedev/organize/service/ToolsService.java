package com.henriqvedev.organize.service;

import com.henriqvedev.organize.entities.Iron;
import com.henriqvedev.organize.entities.Tools;
import com.henriqvedev.organize.exceptions.ResourceNotFoundException;
import com.henriqvedev.organize.repositories.ToolsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ToolsService {

    @Autowired
    private ToolsRepository toolsRepository;

    public List<Tools> findAll(){ //Todas ferramentas
        List<Tools> result = toolsRepository.findAll();
        return result;
    }

    public Tools findById(Long id){ //Ferramenta por Id
        return toolsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ferramenta não encontrada com id: " + id ));
    }

    public Tools save (Tools tools){ // Inserir Ferramenta
        return toolsRepository.save(tools);
    }

    public void deleteById(Long id ){
        Tools tools = toolsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ferramenta não encontrada com o id " + id));
        toolsRepository.delete(tools);
    }

    public Tools update(Long id, Iron obj) {
        Tools entity = toolsRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException(id)
        );


        entity.setName(obj.getName());
        entity.setTp(obj.getTp());
        entity.setSizeCm(obj.getSizeCm());
        entity.setSizeMm(obj.getSizeMm());
        entity.setUnits(obj.getUnits());

        return toolsRepository.save(entity);
    }


}
