import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const pets = [
    { name: 'Max', ownerName: 'John Smith' },
    { name: 'Bella', ownerName: 'Sarah Johnson' },
    { name: 'Charlie', ownerName: 'John Smith' },
    { name: 'Luna', ownerName: 'Emily Davis' },
    { name: 'Rocky', ownerName: 'Michael Brown' },
  ];
  for (const pet of pets) {
    await prisma.pet.create({ data: pet });
  }

  const vets = [
    { id: 1, name: 'Dr. Sarah Martinez', specialty: 'Surgery' },
    { id: 2, name: 'Dr. James Chen', specialty: 'Dentistry' },
    { id: 3, name: 'Dr. Emily Rodriguez', specialty: 'General Practice' },
    { id: 4, name: 'Dr. Michael Thompson', specialty: 'Cardiology' },
  ];
  for (const vet of vets) {
    await prisma.vet.create({ data: vet });
  }

  const initialVisits = [
    {
      id: 1,
      dateTime: new Date('2025-11-15T09:30:00Z'),
      clinic: 'Downtown Clinic',
      summary:
        'Pre-operative surgical consultation for neutering procedure. Patient examined and deemed healthy for anesthesia. Bloodwork results reviewed and within normal limits. Surgery scheduled for next week. Pre-operative fasting instructions provided to owner.',
      petId: 1,
      vetId: 1,
    },
    {
      id: 2,
      dateTime: new Date('2025-11-18T14:00:00Z'),
      clinic: 'North Branch',
      summary:
        'Routine wellness examination. All vital signs normal. Dental cleaning performed. Owner educated about dental care at home. No concerns noted.',
      petId: 1,
      vetId: 3,
    },
    {
      id: 3,
      dateTime: new Date('2025-11-10T10:15:00Z'),
      clinic: 'East Side Clinic',
      summary:
        'Dental examination revealed minor tartar buildup. Professional cleaning completed. Two teeth required extraction due to decay. Post-operative care instructions provided. Pain medication prescribed.',
      petId: 2,
      vetId: 2,
    },
    {
      id: 4,
      dateTime: new Date('2025-11-20T11:45:00Z'),
      clinic: 'Downtown Clinic',
      summary:
        'Surgical consultation for mass removal. Pre-operative bloodwork ordered. Surgery scheduled for next week. Owner counseled on procedure risks and recovery expectations.',
      petId: 2,
      vetId: 1,
    },
    {
      id: 5,
      dateTime: new Date('2025-11-12T16:30:00Z'),
      clinic: 'North Branch',
      summary:
        'Presented with lethargy and reduced appetite. Physical examination unremarkable. Bloodwork shows mild dehydration. Subcutaneous fluids administered. Dietary recommendations provided. Recheck in 3 days if symptoms persist.',
      petId: 3,
      vetId: 3,
    },
  ];
  for (const visit of initialVisits) {
    await prisma.visit.create({ data: visit });
  }

  const invoices = [
    {
      id: 1,
      invoiceNumber: 'INV-2025-001',
      invoiceDate: new Date('2025-11-15T09:30:00Z'),
      amount: '150.00',
      visitId: 1,
    },
    {
      id: 2,
      invoiceNumber: 'INV-2025-002',
      invoiceDate: new Date('2025-11-18T14:00:00Z'),
      amount: '75.50',
      visitId: 2,
    },
    {
      id: 3,
      invoiceNumber: 'INV-2025-003',
      invoiceDate: new Date('2025-11-10T10:15:00Z'),
      amount: '300.00',
      visitId: 3,
    },
    {
      id: 4,
      invoiceNumber: 'INV-2025-004',
      invoiceDate: new Date('2025-11-20T11:45:00Z'),
      amount: '450.00',
      visitId: 4,
    },
    {
      id: 5,
      invoiceNumber: 'INV-2025-005',
      invoiceDate: new Date('2025-11-12T16:30:00Z'),
      amount: '120.00',
      visitId: 5,
    },
  ];
  for (const invoice of invoices) {
    await prisma.invoice.create({ data: invoice });
  }

  // These visits are added after the invoices, mirroring data.sql's insertion order.
  const additionalVisits = [
    {
      id: 6,
      dateTime: new Date('2025-11-22T08:00:00Z'),
      clinic: 'East Side Clinic',
      summary:
        'Routine dental prophylaxis. Moderate periodontal disease noted. Full mouth radiographs taken. One molar extracted. Antibiotic therapy initiated. Home care demonstration completed with owner.',
      petId: 4,
      vetId: 2,
    },
    {
      id: 7,
      dateTime: new Date('2025-11-17T13:20:00Z'),
      clinic: 'Downtown Clinic',
      summary:
        'Post-operative follow-up after spay surgery. Incision healing well with no signs of infection. Sutures intact. Activity restriction to continue for one more week. Recheck scheduled for suture removal.',
      petId: 4,
      vetId: 1,
    },
    {
      id: 8,
      dateTime: new Date('2025-11-21T15:00:00Z'),
      clinic: 'North Branch',
      summary:
        'Cardiac evaluation for heart murmur detected during routine exam. Echocardiogram performed showing mild mitral valve insufficiency. No clinical signs of heart failure at this time. Monitoring recommended every 6 months. Owner educated on warning signs.',
      petId: 4,
      vetId: 4,
    },
  ];
  for (const visit of additionalVisits) {
    await prisma.visit.create({ data: visit });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
