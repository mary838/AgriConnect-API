import app from "./app";
import { connectDB } from "./config/database";
import { Role } from "./models/Role";

const PORT = process.env.PORT || 5000;

// Seed roles in DB
async function seedRoles() {
  const defaultRoles = ["admin", "farmer", "customer"];

  for (const name of defaultRoles) {
    const exists = await Role.findOne({ name });
    if (!exists) {
      await Role.create({ name });
      console.log(`Role created: ${name}`);
    } else {
      console.log(`Role already exists: ${name}`);
    }
  }
}

// Main function to start server
(async () => {
  try {
    await connectDB();
    console.log("MongoDB connected ");

    await seedRoles();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT} `);
      console.log(`Swagger docs at http://localhost:${PORT}/api-docs`);
    });
  } catch (err) {
    console.error(" Error starting server:", err);
    process.exit(1);
  }
})();
