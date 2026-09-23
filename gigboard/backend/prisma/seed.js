import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = await bcryptjs.hash("adminpassword", 10);

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
      id: "1",
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