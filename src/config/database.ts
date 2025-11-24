import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected ");
    console.log("DB Name:", conn.connection.name);

    const db = conn.connection.db;
    if (db) {
      const collections = await db.listCollections().toArray();
      console.log(
        "Collections:",
        collections.map((c) => c.name)
      );
    } else {
      console.log("Collections: <no database available on connection>");
    }
  } catch (error) {
    console.error("MongoDB connection failed ❌", error);
    process.exit(1);
  }
};
