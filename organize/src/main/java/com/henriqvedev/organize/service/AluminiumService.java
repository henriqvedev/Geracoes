package com.henriqvedev.organize.service;


import com.henriqvedev.organize.entities.Aluminium;
import com.henriqvedev.organize.repositories.AluminiumRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AluminiumService {

    @Autowired
    private AluminiumRepository aluminiumRepository;

    public List<Aluminium> findAll(){ //busca todos aluminios
        List<Aluminium> result = aluminiumRepository.findAll();
        return result;
    }

    public Aluminium save(Aluminium aluminium){ //Insere aluminios
        return aluminiumRepository.save(aluminium);
    }


}
