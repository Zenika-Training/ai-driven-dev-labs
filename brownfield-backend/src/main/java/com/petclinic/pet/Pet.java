package com.petclinic.pet;

import com.petclinic.visit.Visit;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Pet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String ownerName;

    @OneToMany
    @JoinColumn(name = "petId")
    private List<Visit> visits = new ArrayList<>();

    public Pet() {
    }

    public Pet(Long id, String name, String ownerName, List<Visit> visits) {
        this.id = id;
        this.name = name;
        this.ownerName = ownerName;
        this.visits = visits != null ? visits : new ArrayList<>();
    }

    public Pet(String name, String ownerName, List<Visit> visits) {
        this.name = name;
        this.ownerName = ownerName;
        this.visits = visits != null ? visits : new ArrayList<>();
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

    public List<Visit> getVisits() {
        return visits;
    }
}
