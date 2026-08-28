import "dotenv/config";
import { connectDB } from "../config/db.js";
import { User } from "../models/index.js";
import { hash_password } from "../services/auth.service.js";

const ADMIN_EMAIL = "admin@example.com";
const ADMIN_PASSWORD = "password123";

await connectDB();

const existing = await User.scope("withPassword").findOne({
  where: { email: ADMIN_EMAIL },
});

if (existing) {
  existing.role = "admin";
  existing.isActive = true;
  existing.password = await hash_password(ADMIN_PASSWORD);
  await existing.save();
  console.log(`Admin updated: ${ADMIN_EMAIL} (id ${existing.id})`);
} else {
  const admin = await User.create({
    firstname: "Site",
    lastname: "Admin",
    email: ADMIN_EMAIL,
    password: await hash_password(ADMIN_PASSWORD),
    role: "admin",
    isActive: true,
  });
  console.log(`Admin created: ${ADMIN_EMAIL} (id ${admin.id})`);
}

process.exit(0);
