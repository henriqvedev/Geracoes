package com.henriqvedev.organize.service;

import com.henriqvedev.organize.entities.Iron;
import com.henriqvedev.organize.repositories.IronRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IronService {

    @Autowired
    private IronRepository ironRepository;

    public List<Iron> findAll() {  //Buscar todos os ferros
        List<Iron> result = ironRepository.findAll();
        return result;
    }

    public Iron save (Iron iron){ //Inserir ferros
        return ironRepository.save(iron);
    }
}
