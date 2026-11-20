import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

const invoiceWithRelations = Prisma.validator<Prisma.InvoiceDefaultArgs>()({
  include: { visit: { include: { pet: true, vet: true } } },
});

export type InvoiceWithRelations = Prisma.InvoiceGetPayload<
  typeof invoiceWithRelations
>;

@Injectable()
export class InvoiceRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<InvoiceWithRelations[]> {
    return this.prisma.invoice.findMany({
      include: { visit: { include: { pet: true, vet: true } } },
    });
  }

  findById(id: number): Promise<InvoiceWithRelations | null> {
    return this.prisma.invoice.findUnique({
      where: { id },
      include: { visit: { include: { pet: true, vet: true } } },
    });
  }
}
