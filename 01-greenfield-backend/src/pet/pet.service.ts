import { Injectable } from '@nestjs/common';
import { Pet } from '@prisma/client';
import { PetRepository } from './pet.repository';

@Injectable()
export class PetService {
  constructor(private readonly petRepository: PetRepository) {}

  findById(id: number): Promise<Pet | null> {
    return this.petRepository.findById(id);
  }

  findByName(name: string): Promise<Pet[]> {
    return this.petRepository.findByName(name);
  }
}
