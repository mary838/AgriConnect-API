import { Router } from "express";
import authRoutes from "./authRoutes";
import roleroutes from "./roleRoutes";
import farmerRoutes from "./createUserRoutes";

import profileRoutes from "./profile.routes";

const router = Router();

// Mount routes under /api
// Mount routes under /api
router.use("/auth", authRoutes);
router.use("/roles", roleroutes);
router.use("/user", profileRoutes);
router.use(farmerRoutes);
export default router;
