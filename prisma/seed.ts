import { prisma } from '../lib/prisma.ts';

async function main() {
  await prisma.entry.createMany({
    data: [
      { title: 'My first entry', tag: 'personal' },
      { title: 'Learning Prisma', tag: 'coding' },
    ],
  });

  console.log('Seed finished!');
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
