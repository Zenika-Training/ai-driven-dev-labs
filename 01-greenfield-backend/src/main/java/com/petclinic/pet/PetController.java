package com.petclinic.pet;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/pets")
public class PetController {

    private final PetService petService;

    public PetController(PetService petService) {
        this.petService = petService;
    }

    @GetMapping("/{id}")
    public Optional<Pet> findById(@PathVariable Long id) {
        return petService.findById(id);
    }

    @GetMapping
    public List<Pet> findByName(@RequestParam String name) {
        return petService.findByName(name);
    }
}
