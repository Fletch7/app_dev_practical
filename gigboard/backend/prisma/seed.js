import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = await bcryptjs.hash("password123", 10);

  await prisma.user.create({
    data: {
      firstName: "Admin",
      lastName: "User",
      emailAddress: "admin@gigboard.com",
      password,
      role: "ADMIN",
    },
  });

  await prisma.venue.create({
    data: {
      name: "The Vault",
      suburb: "Dunedin Central",
      city: "Dunedin",
      capacity: 300,
    },
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });