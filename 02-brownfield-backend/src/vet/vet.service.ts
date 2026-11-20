import { Injectable } from '@nestjs/common';
import { Vet } from '@prisma/client';
import { VetRepository } from './vet.repository';

@Injectable()
export class VetService {
  constructor(private readonly vetRepository: VetRepository) {}

  findAll(): Promise<Vet[]> {
    return this.vetRepository.findAll();
  }

  findById(id: number): Promise<Vet | null> {
    return this.vetRepository.findById(id);
  }

  findByName(name: string): Promise<Vet | null> {
    return this.vetRepository.findByName(name);
  }
}
