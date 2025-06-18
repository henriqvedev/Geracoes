package com.henriqvedev.organize.entities;

import jakarta.persistence.*;

@Entity
@Table (name = "tb_iron")
public class Iron {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;
    private String name; //Barra, tubo, Chapa ...
    private String tp;  //Galvanizado, pintado  ...
    private int units;
    private Long sizeCm;
    private Long sizeMm;
    private int meters;

    public Iron(){
    }





}
