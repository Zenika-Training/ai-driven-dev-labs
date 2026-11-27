import { afterEach, describe, expect, it } from 'vitest';
import { DatabaseService } from './database.service';

describe('DatabaseService', () => {
  let database: DatabaseService | undefined;

  afterEach(() => {
    database?.onModuleDestroy();
    database = undefined;
  });

  it('should create the schema and seed records during initialization', () => {
    // given
    database = new DatabaseService();

    // when
    database.onModuleInit();

    // then
    const count = database.connection
      .prepare<[], { count: number }>('SELECT COUNT(*) AS count FROM pet')
      .get();
    expect(count?.count).toBe(5);
  });

  it('should not duplicate seed records when initialized more than once', () => {
    // given
    database = new DatabaseService();

    // when
    database.onModuleInit();
    database.onModuleInit();

    // then
    const count = database.connection
      .prepare<[], { count: number }>('SELECT COUNT(*) AS count FROM pet')
      .get();
    expect(count?.count).toBe(5);
  });
});
