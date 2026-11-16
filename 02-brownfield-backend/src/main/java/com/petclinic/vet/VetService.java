package com.petclinic.vet;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VetService {
    
    private final VetRepository vetRepository;
    
    public VetService(VetRepository vetRepository) {
        this.vetRepository = vetRepository;
    }
    
    public List<Vet> findAll() {
        return vetRepository.findAll();
    }
    
    public Vet findById(Long id) {
        return vetRepository.findById(id).orElse(null);
    }
    
    public Vet findByName(String name) {
        return vetRepository.findByName(name);
    }
}
