import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.category.createMany({
    data: [
      { name: "Food & Drinks", color: "#FF5733" },
      { name: "Transportation", color: "#33C1FF" },
      { name: "Utilities", color: "#9B59B6" },
      { name: "Health", color: "#2ECC71" },
      { name: "Entertainment", color: "#F39C12" },
      { name: "Education", color: "#2980B9" },
      { name: "Shopping", color: "#E91E63" },
      { name: "Savings", color: "#1ABC9C" },
      { name: "Investment", color: "#8E44AD" },
      { name: "Others", color: "#95A5A6" },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Categories seeded successfully.");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding categories:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
