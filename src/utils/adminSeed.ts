import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { User } from "../models/User";
import { Role } from "../models/Role";
import { UserRole } from "../models/UserRole";

dotenv.config();

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/agri_connect";

async function seedAdmin() {
  try {
    console.log("Connecting to MongoDB:", MONGO_URI);
    await mongoose.connect(MONGO_URI);

    // Roles: admin, farmer, customer
    const roles = ["admin", "farmer", "customer"];
    const roleDocs: Record<string, any> = {};

    for (const roleName of roles) {
      let role = await Role.findOne({ name: roleName });
      if (!role) {
        role = await Role.create({ name: roleName });
        console.log(` Created role: ${roleName}`);
      } else {
        console.log(`ℹ Role exists: ${roleName}`);
      }
      roleDocs[roleName] = role;
    }

    // Admin user
    const adminEmail = "admin@example.com";
    const adminPassword = "Admin@123";
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
      console.log(" Created admin user");
    } else {
      adminUser.password = hashedPassword;
      await adminUser.save();
      console.log(" Admin user already exists, password updated");
    }

    // Assign all 3 roles to admin
    for (const roleName of roles) {
      const existsUR = await UserRole.findOne({
        user_id: adminUser._id,
        role_id: roleDocs[roleName]._id,
      });
      if (!existsUR) {
        await UserRole.create({
          user_id: adminUser._id,
          role_id: roleDocs[roleName]._id,
        });
        console.log(`Assigned role ${roleName} to admin`);
      } else {
        console.log(` UserRole mapping exists for ${roleName}`);
      }
    }

    console.log(" Seeding finished successfully");
  } catch (err) {
    console.error(" Seed error:", err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seedAdmin();
