// util/roleseed.ts
import { Role } from "../models/Role";

export const seedRoles = async () => {
  try {
    const roles = ["user", "admin"];
    for (const roleName of roles) {
      const existingRole = await Role.findOne({ where: { name: roleName } });
      if (!existingRole) {
        await Role.create({ name: roleName });
        console.log(`Role ${roleName} created`);
      }
    }
  } catch (err) {
    console.error("Error seeding roles:", err);
  }
};
