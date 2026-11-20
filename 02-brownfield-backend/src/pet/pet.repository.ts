import { Injectable } from '@nestjs/common';
import { Pet } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PetRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Pet[]> {
    return this.prisma.pet.findMany();
  }

  findById(id: number): Promise<Pet | null> {
    return this.prisma.pet.findUnique({ where: { id } });
  }

  findByName(name: string): Promise<Pet | null> {
    return this.prisma.pet.findFirst({ where: { name } });
  }

  findByNameAndOwnerName(name: string, ownerName: string): Promise<Pet | null> {
    return this.prisma.pet.findFirst({ where: { name, ownerName } });
  }

  save(data: { name: string; ownerName: string }): Promise<Pet> {
    return this.prisma.pet.create({ data });
  }

  delete(id: number): Promise<void> {
    return this.prisma.pet.delete({ where: { id } }).then(() => undefined);
  }
}
