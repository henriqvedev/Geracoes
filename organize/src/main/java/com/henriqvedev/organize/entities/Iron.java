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

    public Iron(Long id, String name, String tp, int units, Long sizeCm, Long sizeMm, int meters) {
        this.id = id;
        this.name = name;
        this.tp = tp;
        this.units = units;
        this.sizeCm = sizeCm;
        this.sizeMm = sizeMm;
        this.meters = meters;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTp() {
        return tp;
    }

    public void setTp(String tp) {
        this.tp = tp;
    }

    public int getUnits() {
        return units;
    }

    public void setUnits(int units) {
        this.units = units;
    }

    public Long getSizeCm() {
        return sizeCm;
    }

    public void setSizeCm(Long sizeCm) {
        this.sizeCm = sizeCm;
    }

    public Long getSizeMm() {
        return sizeMm;
    }

    public void setSizeMm(Long sizeMm) {
        this.sizeMm = sizeMm;
    }

    public int getMeters() {
        return meters;
    }

    public void setMeters(int meters) {
        this.meters = meters;
    }
}
