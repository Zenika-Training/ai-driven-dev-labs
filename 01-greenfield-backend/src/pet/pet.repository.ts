import { Injectable } from '@nestjs/common';
import { Pet } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PetRepository {
  constructor(private readonly prisma: PrismaService) {}

  findById(id: number): Promise<Pet | null> {
    return this.prisma.pet.findUnique({ where: { id } });
  }

  findByName(name: string): Promise<Pet[]> {
    return this.prisma.pet.findMany({ where: { name } });
  }
}
