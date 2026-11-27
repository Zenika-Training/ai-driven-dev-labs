import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Visit } from './visit.model';

type VisitRow = {
  id: number;
  dateTime: string;
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
export class VisitRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  findAll(): Visit[] {
    return this.findVisits();
  }

  findById(id: number): Visit | null {
    const visit = this.findVisits('WHERE v.id = ?', [id])[0];
    return visit ?? null;
  }

  findByPetId(petId: number): Visit[] {
    return this.findVisits('WHERE v.petId = ?', [petId]);
  }

  private findVisits(
    whereClause = '',
    parameters: number[] = [],
  ): Visit[] {
    const rows = this.databaseService.connection
      .prepare(
        `SELECT
          v.id,
          v.dateTime,
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
        FROM visit v
        INNER JOIN pet p ON p.id = v.petId
        LEFT JOIN vet ON vet.id = v.vetId
        ${whereClause}
        ORDER BY v.id`,
      )
      .all(...parameters) as VisitRow[];

    return rows.map((row) => ({
      id: row.id,
      dateTime: new Date(row.dateTime),
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
    }));
  }
}
