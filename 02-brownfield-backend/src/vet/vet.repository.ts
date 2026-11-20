import { Injectable } from '@nestjs/common';
import { Vet } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VetRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Vet[]> {
    return this.prisma.vet.findMany();
  }

  findById(id: number): Promise<Vet | null> {
    return this.prisma.vet.findUnique({ where: { id } });
  }

  findByName(name: string): Promise<Vet | null> {
    return this.prisma.vet.findFirst({ where: { name } });
  }
}
