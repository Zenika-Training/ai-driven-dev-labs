import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import Database from 'better-sqlite3';
import { CREATE_SCHEMA_SQL } from './schema';
import { seedDatabase } from './seed';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private readonly db = new Database(':memory:');

  onModuleInit(): void {
    const initialize = this.db.transaction(() => {
      this.db.exec(CREATE_SCHEMA_SQL);
      seedDatabase(this.db);
    });

    initialize();
  }

  onModuleDestroy(): void {
    this.db.close();
  }

  get connection(): Database.Database {
    return this.db;
  }
}
