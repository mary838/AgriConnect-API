// routes/index.ts
import { Router } from "express";
import authRoutes from "./authroutes";
import createUserRoutes from "./farmer";
import roleroutes from "./roleroutes";
import farmerRoutes from "./farmer";

import profileRoutes from "./profile.routes";

const router = Router();

// Mount routes under /api
router.use("/auth", authRoutes);
router.use("/auth", createUserRoutes);
router.use("/roles", roleroutes);
router.use("/user", profileRoutes);
router.use(farmerRoutes);

export default router;
