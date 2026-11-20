import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

const visitWithRelations = Prisma.validator<Prisma.VisitDefaultArgs>()({
  include: { pet: true, vet: true },
});

export type VisitWithRelations = Prisma.VisitGetPayload<
  typeof visitWithRelations
>;

@Injectable()
export class VisitRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<VisitWithRelations[]> {
    return this.prisma.visit.findMany({ include: { pet: true, vet: true } });
  }

  findById(id: number): Promise<VisitWithRelations | null> {
    return this.prisma.visit.findUnique({
      where: { id },
      include: { pet: true, vet: true },
    });
  }

  findByPetId(petId: number): Promise<VisitWithRelations[]> {
    return this.prisma.visit.findMany({
      where: { petId },
      include: { pet: true, vet: true },
    });
  }
}
