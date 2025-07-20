package com.henriqvedev.organize.service;


import com.henriqvedev.organize.entities.Aluminium;
import com.henriqvedev.organize.exceptions.ResourceNotFoundException;
import com.henriqvedev.organize.repositories.AluminiumRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AluminiumService {

    @Autowired
    private AluminiumRepository aluminiumRepository;

    public List<Aluminium> findAll(){ //Todos aluminios
        List<Aluminium> result = aluminiumRepository.findAll();
        return result;
    }

    public Aluminium findById(Long id){ //Aluminio por ID
        return aluminiumRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Aluminio não encontrado com id: " + id));
    }

    public Aluminium save(Aluminium aluminium){ //Insere aluminios

        return aluminiumRepository.save(aluminium);
    }

    public void deleteById(Long id) { //Delete por ID
        Aluminium aluminium = aluminiumRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Aluminio não encontrado com id: " + id));
        aluminiumRepository.delete(aluminium);

    }

    public Aluminium update(Long id, Aluminium obj) {
        Aluminium entity = aluminiumRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException(id)
        );


        entity.setName(obj.getName());
        entity.setTp(obj.getTp());
        entity.setSizeCm(obj.getSizeCm());
        entity.setSizeMm(obj.getSizeMm());
        entity.setMeters(obj.getMeters());
        entity.setUnits(obj.getUnits());

        return aluminiumRepository.save(entity);
    }

}
