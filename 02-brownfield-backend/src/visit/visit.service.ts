import { Injectable } from '@nestjs/common';
import { VisitRepository } from './visit.repository';
import { Visit } from './visit.model';

@Injectable()
export class VisitService {
  constructor(private readonly visitRepository: VisitRepository) {}

  findAll(): Visit[] {
    return this.visitRepository.findAll();
  }

  findById(id: number): Visit | null {
    return this.visitRepository.findById(id);
  }

  findByPetId(petId: number): Visit[] {
    return this.visitRepository.findByPetId(petId);
  }
}
