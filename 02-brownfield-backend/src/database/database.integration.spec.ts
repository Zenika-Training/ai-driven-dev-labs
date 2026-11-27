import { describe, expect, it, afterEach, beforeEach } from 'vitest';
import { DatabaseService } from './database.service';
import { PetRepository } from '../pet/pet.repository';
import { VetRepository } from '../vet/vet.repository';
import { VisitRepository } from '../visit/visit.repository';
import { InvoiceRepository } from '../invoice/invoice.repository';
import { PetService } from '../pet/pet.service';
import { CreatePetDto } from '../pet/dto/create-pet.dto';

describe('SQLite database integration', () => {
  let databaseService: DatabaseService;
  let petRepository: PetRepository;
  let vetRepository: VetRepository;
  let visitRepository: VisitRepository;
  let invoiceRepository: InvoiceRepository;

  beforeEach(() => {
    databaseService = new DatabaseService();
    databaseService.onModuleInit();
    petRepository = new PetRepository(databaseService);
    vetRepository = new VetRepository(databaseService);
    visitRepository = new VisitRepository(databaseService);
    invoiceRepository = new InvoiceRepository(databaseService);
  });

  afterEach(() => {
    databaseService.onModuleDestroy();
  });

  it('should create all tables and load the complete seed', () => {
    // given
    const tables = databaseService.connection
      .prepare(
        `SELECT name FROM sqlite_master
         WHERE type = 'table' AND name IN ('pet', 'vet', 'visit', 'invoice')
         ORDER BY name`,
      )
      .all() as Array<{ name: string }>;

    // when
    const pets = petRepository.findAll();
    const vets = vetRepository.findAll();
    const visits = visitRepository.findAll();
    const invoices = invoiceRepository.findAll();

    // then
    expect(tables.map((table) => table.name)).toEqual([
      'invoice',
      'pet',
      'vet',
      'visit',
    ]);
    expect(pets).toHaveLength(5);
    expect(vets).toHaveLength(4);
    expect(visits).toHaveLength(8);
    expect(invoices).toHaveLength(5);
  });

  it('should map visit relations, nullable vets, dates, and exact invoice amounts', () => {
    // given
    databaseService.connection
      .prepare(
        `INSERT INTO visit
          (id, dateTime, clinic, summary, petId, vetId)
          VALUES (?, ?, ?, ?, ?, ?)`,
      )
      .run(
        9,
        '2025-11-23T12:00:00.000Z',
        'Test Clinic',
        'Follow-up',
        5,
        null,
      );

    // when
    const visit = visitRepository.findById(9);
    const invoice = invoiceRepository.findById(2);

    // then
    expect(visit?.dateTime).toEqual(new Date('2025-11-23T12:00:00.000Z'));
    expect(visit?.pet.name).toBe('Rocky');
    expect(visit?.vet).toBeNull();
    expect(invoice?.amount).toBe('75.50');
    expect(invoice?.invoiceDate).toEqual(new Date('2025-11-18T14:00:00.000Z'));
    expect(invoice?.visit.pet.name).toBe('Max');
    expect(invoice?.visit.vet?.name).toBe('Dr. Emily Rodriguez');
  });

  it('should enforce foreign keys and one invoice per visit', () => {
    // given
    const insertVisit = databaseService.connection.prepare(
      `INSERT INTO visit
        (id, dateTime, clinic, summary, petId, vetId)
        VALUES (?, ?, ?, ?, ?, ?)`,
    );

    // when & then
    expect(() =>
      insertVisit.run(
        9,
        '2025-11-23T12:00:00.000Z',
        'Test Clinic',
        'Invalid pet',
        999,
        null,
      ),
    ).toThrow();
    expect(() =>
      databaseService.connection
        .prepare(
          `INSERT INTO invoice
            (id, invoiceNumber, invoiceDate, amountCents, visitId)
            VALUES (?, ?, ?, ?, ?)`,
        )
        .run(6, 'INV-2025-006', '2025-11-23T12:00:00.000Z', 1000, 1),
    ).toThrow();
  });

  it('should enforce pet uniqueness at the database boundary', () => {
    // given
    const savePet = databaseService.connection.prepare(
      'INSERT INTO pet (name, ownerName) VALUES (?, ?)',
    );

    // when & then
    expect(() => savePet.run('Max', 'John Smith')).toThrow();
  });

  it('should save a pet from a transformed request DTO', () => {
    // given
    const petService = new PetService(petRepository);
    const createPetDto = Object.assign(new CreatePetDto(), {
      name: 'Integration Pet',
      ownerName: 'Integration Owner',
    });

    // when
    const pet = petService.save(createPetDto);

    // then
    expect(pet).toEqual({
      id: 6,
      name: 'Integration Pet',
      ownerName: 'Integration Owner',
    });
  });
});
