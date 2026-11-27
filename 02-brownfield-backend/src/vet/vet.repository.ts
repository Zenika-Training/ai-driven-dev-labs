import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Vet } from './vet.model';

@Injectable()
export class VetRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  findAll(): Vet[] {
    return this.databaseService.connection
      .prepare('SELECT id, name, specialty FROM vet ORDER BY id')
      .all() as Vet[];
  }

  findById(id: number): Vet | null {
    return (
      (this.databaseService.connection
        .prepare('SELECT id, name, specialty FROM vet WHERE id = ?')
        .get(id) as Vet | undefined) ?? null
    );
  }

  findByName(name: string): Vet | null {
    return (
      (this.databaseService.connection
        .prepare(
          'SELECT id, name, specialty FROM vet WHERE name = ? ORDER BY id LIMIT 1',
        )
        .get(name) as Vet | undefined) ?? null
    );
  }
}
