import { Injectable } from '@nestjs/common';
import { VetRepository } from './vet.repository';
import { Vet } from './vet.model';

@Injectable()
export class VetService {
  constructor(private readonly vetRepository: VetRepository) {}

  findAll(): Vet[] {
    return this.vetRepository.findAll();
  }

  findById(id: number): Vet | null {
    return this.vetRepository.findById(id);
  }

  findByName(name: string): Vet | null {
    return this.vetRepository.findByName(name);
  }
}
