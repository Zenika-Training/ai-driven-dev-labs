package com.petclinic.visit;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDateTime;

@Entity
public class Visit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime dateTime;

    private String clinic;

    private Long petId;

    public Visit() {
    }

    public Visit(Long id, LocalDateTime dateTime, String clinic, Long petId) {
        this.id = id;
        this.dateTime = dateTime;
        this.clinic = clinic;
        this.petId = petId;
    }

    public Visit(LocalDateTime dateTime, String clinic, Long petId) {
        this.dateTime = dateTime;
        this.clinic = clinic;
        this.petId = petId;
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

    public Long getPetId() {
        return petId;
    }
}
