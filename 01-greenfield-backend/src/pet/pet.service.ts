import { Injectable } from '@nestjs/common';
import { Pet } from './pet.model';
import { PetRepository } from './pet.repository';

@Injectable()
export class PetService {
  constructor(private readonly petRepository: PetRepository) {}

  findById(id: number): Pet | null {
    return this.petRepository.findById(id);
  }

  findByName(name: string): Pet[] {
    return this.petRepository.findByName(name);
  }
}
