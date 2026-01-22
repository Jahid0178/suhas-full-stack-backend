import { PrismaClient } from "../src/generated/prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL as string,
});

async function main() {
  const adminEmail: string = "admin@example.com";
  const adminPassword: string = await bcrypt.hash("admin123", 10);

  const admin = await prisma.user.upsert({
    where: {
      email: adminEmail,
    },
    update: {},
    create: {
      email: adminEmail,
      password: adminPassword,
      name: "Admin",
      role: "ADMIN",
    },
  });

  console.log("Admin created/verified:", admin.email);
  console.log("Seeding finished!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
