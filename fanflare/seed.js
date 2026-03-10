async function main() {
  const [{ PrismaPg }, { PrismaClient }, bcryptModule] = await Promise.all([
    import('@prisma/adapter-pg'),
    import('./src/generated/client.ts'),
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
    const user = await prisma.user.create({
      data: {
        email: 'agency@example.com',
        name: 'Agency Owner',
        password: hashedPassword,
        role: 'AGENCY_OWNER',
      },
    });

    console.log('Created user:', user);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch(console.error);
