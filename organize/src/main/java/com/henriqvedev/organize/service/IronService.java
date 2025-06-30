package com.henriqvedev.organize.service;

import com.henriqvedev.organize.entities.Iron;
import com.henriqvedev.organize.exceptions.ResourceNotFoundException;
import com.henriqvedev.organize.repositories.IronRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IronService {

    @Autowired
    private IronRepository ironRepository;

    public List<Iron> findAll() {  //Todos os ferros
        List<Iron> result = ironRepository.findAll();
        return result;
    }

    public Iron findById(Long id){ //Ferro por ID
        return ironRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ferro não encontrado com id: " + id));
    }

    public Iron save (Iron iron){ //Inserir ferros
        return ironRepository.save(iron);
    }

    public void deleteById(Long id) { //Delete por ID
        Iron iron = ironRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ferro não encontrado com id: " + id));
        ironRepository.delete(iron);
    }

    public Iron update(Long id, Iron obj) {
        Iron entity = ironRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException(id)
        );


        entity.setName(obj.getName());
        entity.setTp(obj.getTp());
        entity.setSizeCm(obj.getSizeCm());
        entity.setSizeMm(obj.getSizeMm());
        entity.setMeters(obj.getMeters());
        entity.setUnits(obj.getUnits());

        return ironRepository.save(entity);
    }
}
