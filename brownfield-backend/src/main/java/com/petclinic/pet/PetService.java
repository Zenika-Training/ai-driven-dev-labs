package com.petclinic.pet;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PetService {

    private final PetRepository petRepository;

    public PetService(PetRepository petRepository) {
        this.petRepository = petRepository;
    }

    public List<Pet> findAll() {
        return petRepository.findAll();
    }

    public Pet findById(Long id) {
        return petRepository.findById(id).orElse(null);
    }

    public Pet findByName(String name) {
        return petRepository.findByName(name);
    }

    @Transactional
    public Pet save(Pet pet) {
        validatePetUniquenessPerOwner(pet);
        return petRepository.save(pet);
    }

    @Transactional
    public void delete(Long id) {
        petRepository.deleteById(id);
    }

    private void validatePetUniquenessPerOwner(Pet pet) {
        Pet existingPet = petRepository.findByNameAndOwnerName(pet.getName(), pet.getOwnerName());
        if (existingPet != null && !existingPet.getId().equals(pet.getId())) {
            throw new IllegalArgumentException("Owner " + pet.getOwnerName() + " already has a pet named " + pet.getName());
        }
    }
}
