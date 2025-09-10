import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis;

let prisma;

try {
  prisma = globalForPrisma.prisma || new PrismaClient({
    log: ['query', 'error', 'warn'],
    errorFormat: 'pretty',
  });
} catch (error) {
  console.warn('Prisma client initialization failed:', error.message);
  console.warn('Please run "prisma generate" to generate the client');
  prisma = null;
}

if (process.env.NODE_ENV !== 'production' && prisma) {
  globalForPrisma.prisma = prisma;
}

// Handle graceful shutdown
process.on('beforeExit', async () => {
  if (prisma) {
    await prisma.$disconnect();
  }
});

export { prisma };
