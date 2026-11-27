import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Invoice } from './invoice.model';

type InvoiceRow = {
  id: number;
  invoiceNumber: string;
  invoiceDate: string;
  amountCents: number;
  visitId: number;
  visitDateTime: string;
  clinic: string;
  summary: string;
  visitPetId: number;
  visitVetId: number | null;
  petId: number;
  petName: string;
  petOwnerName: string;
  vetId: number | null;
  vetName: string | null;
  vetSpecialty: string | null;
};

@Injectable()
export class InvoiceRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  findAll(): Invoice[] {
    return this.findInvoices();
  }

  findById(id: number): Invoice | null {
    const invoice = this.findInvoices('WHERE i.id = ?', [id])[0];
    return invoice ?? null;
  }

  private findInvoices(
    whereClause = '',
    parameters: number[] = [],
  ): Invoice[] {
    const rows = this.databaseService.connection
      .prepare(
        `SELECT
          i.id,
          i.invoiceNumber,
          i.invoiceDate,
          i.amountCents,
          i.visitId,
          v.dateTime AS visitDateTime,
          v.clinic,
          v.summary,
          v.petId AS visitPetId,
          v.vetId AS visitVetId,
          p.id AS petId,
          p.name AS petName,
          p.ownerName AS petOwnerName,
          vet.id AS vetId,
          vet.name AS vetName,
          vet.specialty AS vetSpecialty
        FROM invoice i
        INNER JOIN visit v ON v.id = i.visitId
        INNER JOIN pet p ON p.id = v.petId
        LEFT JOIN vet ON vet.id = v.vetId
        ${whereClause}
        ORDER BY i.id`,
      )
      .all(...parameters) as InvoiceRow[];

    return rows.map((row) => ({
      id: row.id,
      invoiceNumber: row.invoiceNumber,
      invoiceDate: new Date(row.invoiceDate),
      amount: centsToDecimalString(row.amountCents),
      visitId: row.visitId,
      visit: {
        id: row.visitId,
        dateTime: new Date(row.visitDateTime),
        clinic: row.clinic,
        summary: row.summary,
        petId: row.visitPetId,
        vetId: row.visitVetId,
        pet: {
          id: row.petId,
          name: row.petName,
          ownerName: row.petOwnerName,
        },
        vet:
          row.vetId === null
            ? null
            : {
                id: row.vetId,
                name: row.vetName as string,
                specialty: row.vetSpecialty as string,
              },
      },
    }));
  }
}

function centsToDecimalString(amountCents: number): string {
  const cents = BigInt(amountCents);
  const sign = cents < 0n ? '-' : '';
  const absoluteCents = cents < 0n ? -cents : cents;
  const wholeUnits = absoluteCents / 100n;
  const fractionalCents = (absoluteCents % 100n).toString().padStart(2, '0');

  return `${sign}${wholeUnits}.${fractionalCents}`;
}
