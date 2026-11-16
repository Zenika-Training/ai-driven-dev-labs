package com.petclinic.pet;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PetRepository extends JpaRepository<Pet, Long> {
    
    Pet findByName(String name);
    
    Pet findByNameAndOwnerName(String name, String ownerName);
}
