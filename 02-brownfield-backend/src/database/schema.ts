export const CREATE_SCHEMA_SQL = `
  CREATE TABLE IF NOT EXISTS pet (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    ownerName TEXT NOT NULL,
    UNIQUE (name, ownerName)
  );

  CREATE TABLE IF NOT EXISTS vet (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    specialty TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS visit (
    id INTEGER PRIMARY KEY,
    dateTime TEXT NOT NULL,
    clinic TEXT NOT NULL,
    summary TEXT NOT NULL,
    petId INTEGER NOT NULL,
    vetId INTEGER,
    FOREIGN KEY (petId) REFERENCES pet (id),
    FOREIGN KEY (vetId) REFERENCES vet (id)
  );

  CREATE TABLE IF NOT EXISTS invoice (
    id INTEGER PRIMARY KEY,
    invoiceNumber TEXT NOT NULL,
    invoiceDate TEXT NOT NULL,
    amountCents INTEGER NOT NULL,
    visitId INTEGER NOT NULL UNIQUE,
    FOREIGN KEY (visitId) REFERENCES visit (id)
  );
`;
