package com.petclinic.pet;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Pet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String ownerName;

    public Pet() {
    }

    public Pet(Long id, String name, String ownerName) {
        this.id = id;
        this.name = name;
        this.ownerName = ownerName;
    }

    public Pet(String name, String ownerName) {
        this.name = name;
        this.ownerName = ownerName;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getOwnerName() {
        return ownerName;
    }
}
