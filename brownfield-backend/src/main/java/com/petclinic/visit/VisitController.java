package com.petclinic.visit;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/visit")
public class VisitController {

    private final VisitService visitService;

    public VisitController(VisitService visitService) {
        this.visitService = visitService;
    }

    @GetMapping
    public List<Visit> findAll() {
        return visitService.findAll();
    }

    @GetMapping("/{id}")
    public Visit findById(@PathVariable Long id) {
        return visitService.findById(id);
    }

    @GetMapping("/pet/{petId}")
    public List<Visit> findByPetId(@PathVariable Long petId) {
        return visitService.findByPetId(petId);
    }
}
