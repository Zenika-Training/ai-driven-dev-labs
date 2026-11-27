import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Pet } from './pet.model';

@Injectable()
export class PetRepository {
  constructor(private readonly database: DatabaseService) {}

  findById(id: number): Pet | null {
    const pet = this.database.connection
      .prepare<[number], Pet>(
        'SELECT id, name, ownerName FROM pet WHERE id = ?',
      )
      .get(id);

    return pet ?? null;
  }

  findByName(name: string): Pet[] {
    return this.database.connection
      .prepare<[string], Pet>(
        'SELECT id, name, ownerName FROM pet WHERE name = ? ORDER BY id',
      )
      .all(name);
  }
}
