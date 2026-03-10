async function main() {
  const [{ PrismaPg }, { PrismaClient }, bcryptModule] = await Promise.all([
    import('@prisma/adapter-pg'),
    import('@prisma/client'),
    import('bcryptjs'),
  ]);

  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set');
  }

  const bcrypt = bcryptModule.default;
  const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
  });

  try {
    const hashedPassword = await bcrypt.hash('password', 10);
    const user = await prisma.user.upsert({
      where: { email: 'agency@example.com' },
      update: {
        name: 'Agency Owner',
        password: hashedPassword,
        role: 'AGENCY_OWNER',
      },
      create: {
        email: 'agency@example.com',
        name: 'Agency Owner',
        password: hashedPassword,
        role: 'AGENCY_OWNER',
      },
    });

    console.log('Seeded user:', user.email);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch(console.error);
