import { Router } from "express";
import { getRoles, createRole } from "../controllers/roleController";
import { authMiddleware, roleMiddleware } from "../middleware/authmiddleware";

const router = Router();

/**
 * @swagger
 * /api/roles:
 *   post:
 *     summary: Create a new role (admin only)
 *     tags:
 *       - Role
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Role created successfully
 */
router.post("/roles", authMiddleware, roleMiddleware(["admin"]), createRole);

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Get all roles (admin only)
 *     tags:
 *       - Role
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of roles
 */
router.get("/roles", authMiddleware, roleMiddleware(["admin"]), getRoles);

export default router;
