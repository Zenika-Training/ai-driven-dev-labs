package com.petclinic.vet;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/vet")
public class VetController {
    
    private final VetService vetService;
    
    public VetController(VetService vetService) {
        this.vetService = vetService;
    }
    
    @GetMapping
    public List<Vet> findAll() {
        return vetService.findAll();
    }
    
    @GetMapping("/{id}")
    public Vet findById(@PathVariable Long id) {
        return vetService.findById(id);
    }
    
    @GetMapping("/name/{name}")
    public Vet findByName(@PathVariable String name) {
        return vetService.findByName(name);
    }
}
