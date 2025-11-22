package com.petclinic.visit;

import com.petclinic.pet.Pet;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

import java.time.LocalDateTime;

@Entity
public class Visit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime dateTime;

    private String clinic;

    @ManyToOne
    private Pet pet;

    public Visit() {
    }

    public Visit(Long id, LocalDateTime dateTime, String clinic, Pet pet) {
        this.id = id;
        this.dateTime = dateTime;
        this.clinic = clinic;
        this.pet = pet;
    }

    public Visit(LocalDateTime dateTime, String clinic, Pet pet) {
        this.dateTime = dateTime;
        this.clinic = clinic;
        this.pet = pet;
    }

    public Long getId() {
        return id;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public String getClinic() {
        return clinic;
    }

    public Pet getPet() {
        return pet;
    }
}
