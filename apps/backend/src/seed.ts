import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create the Doctor
  const user = await prisma.user.create({
    data: {
      email: "law@heartpirates.com",
      password: "securepassword",
      name: "Dr. Trafalgar Law",
      clinic: {
        create: { name: "Heart Pirates Clinic" },
      },
    },
  });

  console.log("Seeded doctor:", user.name);
}

main()
  .catch((e) => {
    console.error("Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
