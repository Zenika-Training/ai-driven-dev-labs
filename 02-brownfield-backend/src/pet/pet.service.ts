import { Injectable } from '@nestjs/common';
import { PetRepository } from './pet.repository';
import { CreatePetDto } from './dto/create-pet.dto';
import { Pet } from './pet.model';

@Injectable()
export class PetService {
  constructor(private readonly petRepository: PetRepository) {}

  findAll(): Pet[] {
    return this.petRepository.findAll();
  }

  findById(id: number): Pet | null {
    return this.petRepository.findById(id);
  }

  findByName(name: string): Pet | null {
    return this.petRepository.findByName(name);
  }

  save(createPetDto: CreatePetDto): Pet {
    this.validatePetUniquenessPerOwner(
      createPetDto.name,
      createPetDto.ownerName,
    );
    return this.petRepository.save(createPetDto);
  }

  delete(id: number): void {
    return this.petRepository.delete(id);
  }

  private validatePetUniquenessPerOwner(
    name: string,
    ownerName: string,
  ): void {
    const existingPet = this.petRepository.findByNameAndOwnerName(name, ownerName);
    if (existingPet) {
      throw new Error(`Owner ${ownerName} already has a pet named ${name}`);
    }
  }
}
