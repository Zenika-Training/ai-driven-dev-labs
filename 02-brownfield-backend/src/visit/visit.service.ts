import { Injectable } from '@nestjs/common';
import { VisitRepository, VisitWithRelations } from './visit.repository';

@Injectable()
export class VisitService {
  constructor(private readonly visitRepository: VisitRepository) {}

  findAll(): Promise<VisitWithRelations[]> {
    return this.visitRepository.findAll();
  }

  findById(id: number): Promise<VisitWithRelations | null> {
    return this.visitRepository.findById(id);
  }

  findByPetId(petId: number): Promise<VisitWithRelations[]> {
    return this.visitRepository.findByPetId(petId);
  }
}
