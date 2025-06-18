package com.henriqvedev.organize.entities;

import jakarta.persistence.*;

@Entity
@Table (name = "tb_tools")
public class Tools {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name; //fenda, estilete etc
    private String tp; //tipo chave, alicate, disco d corte e etc
    private int units;
    private Long sizeCm;
    private Long sizeMm;

    public Tools(){

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
}
