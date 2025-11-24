// routes/profile.routes.ts
import { Router } from "express";
import { authMiddleware } from "../middleware/authmiddleware";

const router = Router();

// Protected route
router.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: "This is protected", user: (req as any).user });
});

export default router;
