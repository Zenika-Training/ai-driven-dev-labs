import Database from 'better-sqlite3';

const PETS = [
  { id: 1, name: 'Leo', ownerName: 'George Franklin' },
  { id: 2, name: 'Basil', ownerName: 'Betty Davis' },
  { id: 3, name: 'Rosy', ownerName: 'Eduardo Rodriquez' },
  { id: 4, name: 'Jewel', ownerName: 'Harold Davis' },
  { id: 5, name: 'Iggy', ownerName: 'Peter McTavish' },
] as const;

export function seedDatabase(database: Database.Database): void {
  const insertPet = database.prepare(
    'INSERT OR IGNORE INTO pet (id, name, ownerName) VALUES (@id, @name, @ownerName)',
  );

  for (const pet of PETS) {
    insertPet.run(pet);
  }
}
