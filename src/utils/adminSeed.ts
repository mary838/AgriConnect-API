import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { User } from "../models/User";
import { Role } from "../models/Role";
import { UserRole } from "../models/UserRole";

// Load .env variables
dotenv.config();

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/your_db_name";

async function seedAdmin() {
  try {
    console.log("Connecting to MongoDB:", MONGO_URI);
    await mongoose.connect(MONGO_URI);

    // ===== Ensure roles exist =====
    const roles = ["admin", "customer"];
    const roleDocs: Record<string, any> = {};

    for (const roleName of roles) {
      let role = await Role.findOne({ name: roleName });
      if (!role) {
        role = await Role.create({ name: roleName });
        console.log(`✅ Created role: ${roleName}`);
      } else {
        console.log(`ℹ️ Role exists: ${roleName}`);
      }
      roleDocs[roleName] = role;
    }

    // ===== Create or update admin user =====
    const adminEmail = "admin@example.com";
    const adminPassword = "Admin@123"; // fixed password for seeding

    let adminUser = await User.findOne({ email: adminEmail });
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    if (!adminUser) {
      adminUser = await User.create({
        full_name: "Admin User",
        email: adminEmail,
        password: hashedPassword,
        phone: "087420679",
        status: "active",
      });
      console.log("✅ Created admin user");
    } else {
      // Update password in case it was wrong
      adminUser.password = hashedPassword;
      await adminUser.save();
      console.log("ℹ️ Admin user already exists, password updated");
    }

    // ===== Ensure UserRole mapping =====
    const existsUR = await UserRole.findOne({
      user_id: adminUser._id,
      role_id: roleDocs["admin"]._id,
    });
    if (!existsUR) {
      await UserRole.create({
        user_id: adminUser._id,
        role_id: roleDocs["admin"]._id,
      });
      console.log("✅ Assigned admin role to user");
    } else {
      console.log("ℹ️ UserRole mapping exists");
    }

    console.log("🎉 Seeding finished successfully");
  } catch (err) {
    console.error("❌ Seed error:", err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seedAdmin();
