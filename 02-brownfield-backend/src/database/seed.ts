import Database from 'better-sqlite3';

const PETS = [
  { id: 1, name: 'Max', ownerName: 'John Smith' },
  { id: 2, name: 'Bella', ownerName: 'Sarah Johnson' },
  { id: 3, name: 'Charlie', ownerName: 'John Smith' },
  { id: 4, name: 'Luna', ownerName: 'Emily Davis' },
  { id: 5, name: 'Rocky', ownerName: 'Michael Brown' },
] as const;

const VETS = [
  { id: 1, name: 'Dr. Sarah Martinez', specialty: 'Surgery' },
  { id: 2, name: 'Dr. James Chen', specialty: 'Dentistry' },
  { id: 3, name: 'Dr. Emily Rodriguez', specialty: 'General Practice' },
  { id: 4, name: 'Dr. Michael Thompson', specialty: 'Cardiology' },
] as const;

const VISITS = [
  {
    id: 1,
    dateTime: '2025-11-15T09:30:00.000Z',
    clinic: 'Downtown Clinic',
    summary:
      'Pre-operative surgical consultation for neutering procedure. Patient examined and deemed healthy for anesthesia. Bloodwork results reviewed and within normal limits. Surgery scheduled for next week. Pre-operative fasting instructions provided to owner.',
    petId: 1,
    vetId: 1,
  },
  {
    id: 2,
    dateTime: '2025-11-18T14:00:00.000Z',
    clinic: 'North Branch',
    summary:
      'Routine wellness examination. All vital signs normal. Dental cleaning performed. Owner educated about dental care at home. No concerns noted.',
    petId: 1,
    vetId: 3,
  },
  {
    id: 3,
    dateTime: '2025-11-10T10:15:00.000Z',
    clinic: 'East Side Clinic',
    summary:
      'Dental examination revealed minor tartar buildup. Professional cleaning completed. Two teeth required extraction due to decay. Post-operative care instructions provided. Pain medication prescribed.',
    petId: 2,
    vetId: 2,
  },
  {
    id: 4,
    dateTime: '2025-11-20T11:45:00.000Z',
    clinic: 'Downtown Clinic',
    summary:
      'Surgical consultation for mass removal. Pre-operative bloodwork ordered. Surgery scheduled for next week. Owner counseled on procedure risks and recovery expectations.',
    petId: 2,
    vetId: 1,
  },
  {
    id: 5,
    dateTime: '2025-11-12T16:30:00.000Z',
    clinic: 'North Branch',
    summary:
      'Presented with lethargy and reduced appetite. Physical examination unremarkable. Bloodwork shows mild dehydration. Subcutaneous fluids administered. Dietary recommendations provided. Recheck in 3 days if symptoms persist.',
    petId: 3,
    vetId: 3,
  },
  {
    id: 6,
    dateTime: '2025-11-22T08:00:00.000Z',
    clinic: 'East Side Clinic',
    summary:
      'Routine dental prophylaxis. Moderate periodontal disease noted. Full mouth radiographs taken. One molar extracted. Antibiotic therapy initiated. Home care demonstration completed with owner.',
    petId: 4,
    vetId: 2,
  },
  {
    id: 7,
    dateTime: '2025-11-17T13:20:00.000Z',
    clinic: 'Downtown Clinic',
    summary:
      'Post-operative follow-up after spay surgery. Incision healing well with no signs of infection. Sutures intact. Activity restriction to continue for one more week. Recheck scheduled for suture removal.',
    petId: 4,
    vetId: 1,
  },
  {
    id: 8,
    dateTime: '2025-11-21T15:00:00.000Z',
    clinic: 'North Branch',
    summary:
      'Cardiac evaluation for heart murmur detected during routine exam. Echocardiogram performed showing mild mitral valve insufficiency. No clinical signs of heart failure at this time. Monitoring recommended every 6 months. Owner educated on warning signs.',
    petId: 4,
    vetId: 4,
  },
] as const;

const INVOICES = [
  {
    id: 1,
    invoiceNumber: 'INV-2025-001',
    invoiceDate: '2025-11-15T09:30:00.000Z',
    amountCents: 15000,
    visitId: 1,
  },
  {
    id: 2,
    invoiceNumber: 'INV-2025-002',
    invoiceDate: '2025-11-18T14:00:00.000Z',
    amountCents: 7550,
    visitId: 2,
  },
  {
    id: 3,
    invoiceNumber: 'INV-2025-003',
    invoiceDate: '2025-11-10T10:15:00.000Z',
    amountCents: 30000,
    visitId: 3,
  },
  {
    id: 4,
    invoiceNumber: 'INV-2025-004',
    invoiceDate: '2025-11-20T11:45:00.000Z',
    amountCents: 45000,
    visitId: 4,
  },
  {
    id: 5,
    invoiceNumber: 'INV-2025-005',
    invoiceDate: '2025-11-12T16:30:00.000Z',
    amountCents: 12000,
    visitId: 5,
  },
] as const;

export function seedDatabase(database: Database.Database): void {
  const insertPet = database.prepare(
    'INSERT OR IGNORE INTO pet (id, name, ownerName) VALUES (@id, @name, @ownerName)',
  );
  const insertVet = database.prepare(
    'INSERT OR IGNORE INTO vet (id, name, specialty) VALUES (@id, @name, @specialty)',
  );
  const insertVisit = database.prepare(
    `INSERT OR IGNORE INTO visit
      (id, dateTime, clinic, summary, petId, vetId)
      VALUES (@id, @dateTime, @clinic, @summary, @petId, @vetId)`,
  );
  const insertInvoice = database.prepare(
    `INSERT OR IGNORE INTO invoice
      (id, invoiceNumber, invoiceDate, amountCents, visitId)
      VALUES (@id, @invoiceNumber, @invoiceDate, @amountCents, @visitId)`,
  );

  for (const pet of PETS) {
    insertPet.run(pet);
  }
  for (const vet of VETS) {
    insertVet.run(vet);
  }
  for (const visit of VISITS) {
    insertVisit.run(visit);
  }
  for (const invoice of INVOICES) {
    insertInvoice.run(invoice);
  }
}
