import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const pets = [
    { name: 'Leo', ownerName: 'George Franklin' },
    { name: 'Basil', ownerName: 'Betty Davis' },
    { name: 'Rosy', ownerName: 'Eduardo Rodriquez' },
    { name: 'Jewel', ownerName: 'Harold Davis' },
    { name: 'Iggy', ownerName: 'Peter McTavish' },
  ];

  for (const pet of pets) {
    await prisma.pet.create({ data: pet });
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
