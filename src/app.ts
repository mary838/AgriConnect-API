import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authroutes";

import { setupSwagger } from "./config/swagger";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Auth routes first
app.use("/api/auth", authRoutes);

// Swagger docs
setupSwagger(app);

export default app;
