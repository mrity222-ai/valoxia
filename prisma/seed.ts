import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { PRODUCTS } from "../src/data/products";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Admin User...");

  const adminEmail = "admin@vloxia.in";
  const existingAdmin = await prisma.adminUser.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash("Admin@Vloxia2026", 10);
    await prisma.adminUser.create({
      data: {
        email: adminEmail,
        name: "VLOXIA Administrator",
        passwordHash,
        role: "SUPER_ADMIN",
      },
    });
    console.log("Created Super Admin user: admin@vloxia.in / Admin@Vloxia2026");
  } else {
    console.log("Admin user already exists.");
  }

  console.log("Seeding Products into SQLite Database...");
  for (const prod of PRODUCTS) {
    const exists = await prisma.product.findUnique({ where: { slug: prod.id } });
    if (!exists) {
      await prisma.product.create({
        data: {
          id: prod.id,
          slug: prod.id,
          name: prod.name,
          tagline: prod.tagline,
          category: prod.category,
          categoryLabel: prod.categoryLabel,
          price: prod.price,
          originalPrice: prod.originalPrice || null,
          rating: prod.rating,
          reviewsCount: prod.reviewsCount,
          inStock: prod.inStock,
          warranty: prod.warranty,
          specsJson: JSON.stringify(prod.specs),
          highlightsJson: JSON.stringify(prod.highlights),
          image: prod.image,
          badge: prod.badge || null,
          isPublished: true,
          isFeatured: true,
        },
      });
    }
  }

  console.log("Seeding Technology Partners / Client Logos...");
  const partnerExists = await prisma.clientLogo.findFirst({
    where: { name: "Tata EZ Power" },
  });

  if (!partnerExists) {
    await prisma.clientLogo.createMany({
      data: [
        {
          name: "Tata EZ Power",
          logoUrl: "/vloxia-logo.png",
          websiteUrl: "https://www.tatapower.com",
          category: "TECHNOLOGY_PARTNER",
          sortOrder: 1,
          isActive: true,
        },
        {
          name: "Delta Electronics",
          logoUrl: "/vloxia-logo.png",
          websiteUrl: "#",
          category: "TECHNOLOGY_PARTNER",
          sortOrder: 2,
          isActive: true,
        },
      ],
    });
  }

  console.log("Seeding Demo Inquiry Leads...");
  const inquiryCount = await prisma.inquiry.count();
  if (inquiryCount === 0) {
    await prisma.inquiry.createMany({
      data: [
        {
          type: "QUOTE",
          fullName: "Rajesh Sharma",
          phone: "+91 9811223344",
          email: "rajesh.sharma@dlf.in",
          solution: "EV Charging",
          customerType: "Commercial",
          city: "Gurugram, Haryana",
          message: "Require 4 Dual-gun 22kW AC Chargers for commercial IT office parking.",
          status: "NEW",
        },
        {
          type: "PARTNER",
          fullName: "Amit Verma",
          companyName: "Verma Solar Solutions EPC",
          phone: "+91 9988776655",
          email: "amit@vermasolar.com",
          solution: "Multiple Solutions",
          customerType: "Dealer / Channel Partner",
          city: "Jaipur, Rajasthan",
          message: "Interested in becoming an authorised channel distributor for VLOXIA Lithium batteries.",
          status: "IN_REVIEW",
        },
      ],
    });
  }

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
