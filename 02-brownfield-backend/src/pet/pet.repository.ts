import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Pet } from './pet.model';

@Injectable()
export class PetRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  findAll(): Pet[] {
    return this.databaseService.connection
      .prepare('SELECT id, name, ownerName FROM pet ORDER BY id')
      .all() as Pet[];
  }

  findById(id: number): Pet | null {
    return (
      (this.databaseService.connection
        .prepare('SELECT id, name, ownerName FROM pet WHERE id = ?')
        .get(id) as Pet | undefined) ?? null
    );
  }

  findByName(name: string): Pet | null {
    return (
      (this.databaseService.connection
        .prepare(
          'SELECT id, name, ownerName FROM pet WHERE name = ? ORDER BY id LIMIT 1',
        )
        .get(name) as Pet | undefined) ?? null
    );
  }

  findByNameAndOwnerName(name: string, ownerName: string): Pet | null {
    return (
      (this.databaseService.connection
        .prepare(
          'SELECT id, name, ownerName FROM pet WHERE name = ? AND ownerName = ? LIMIT 1',
        )
        .get(name, ownerName) as Pet | undefined) ?? null
    );
  }

  save(data: { name: string; ownerName: string }): Pet {
    const result = this.databaseService.connection
      .prepare('INSERT INTO pet (name, ownerName) VALUES (?, ?)')
      .run(data.name, data.ownerName);

    return this.findById(Number(result.lastInsertRowid)) as Pet;
  }

  delete(id: number): void {
    const result = this.databaseService.connection
      .prepare('DELETE FROM pet WHERE id = ?')
      .run(id);

    if (result.changes === 0) {
      throw new Error(`Pet with id ${id} not found`);
    }
  }
}
