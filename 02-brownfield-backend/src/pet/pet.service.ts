import { Injectable } from '@nestjs/common';
import { Pet } from '@prisma/client';
import { PetRepository } from './pet.repository';
import { CreatePetDto } from './dto/create-pet.dto';

@Injectable()
export class PetService {
  constructor(private readonly petRepository: PetRepository) {}

  findAll(): Promise<Pet[]> {
    return this.petRepository.findAll();
  }

  findById(id: number): Promise<Pet | null> {
    return this.petRepository.findById(id);
  }

  findByName(name: string): Promise<Pet | null> {
    return this.petRepository.findByName(name);
  }

  async save(createPetDto: CreatePetDto): Promise<Pet> {
    await this.validatePetUniquenessPerOwner(
      createPetDto.name,
      createPetDto.ownerName,
    );
    return this.petRepository.save(createPetDto);
  }

  delete(id: number): Promise<void> {
    return this.petRepository.delete(id);
  }

  private async validatePetUniquenessPerOwner(
    name: string,
    ownerName: string,
  ): Promise<void> {
    const existingPet = await this.petRepository.findByNameAndOwnerName(
      name,
      ownerName,
    );
    if (existingPet) {
      throw new Error(`Owner ${ownerName} already has a pet named ${name}`);
    }
  }
}
