import { Router } from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController";
import { authMiddleware, roleMiddleware } from "../middleware/authmiddleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management (admin)
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: "Create a new user (farmer with two roles: farmer + customer)"
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - full_name
 *               - email
 *               - password
 *             properties:
 *               full_name:
 *                 type: string
 *                 example: "Mary Leakea"
 *               email:
 *                 type: string
 *                 example: "mary@example.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *               phone:
 *                 type: string
 *                 example: "0123456789"
 *     responses:
 *       201:
 *         description: User created successfully with roles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 full_name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 roles:
 *                   type: array
 *                   items:
 *                     type: string
 */
router.post("/", authMiddleware, roleMiddleware(["admin"]), createUser);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: "Get all users"
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   full_name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   phone:
 *                     type: string
 *                   roles:
 *                     type: array
 *                     items:
 *                       type: string
 */
router.get("/", authMiddleware, roleMiddleware(["admin"]), getAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: "Get a user by ID"
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 full_name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 roles:
 *                   type: array
 *                   items:
 *                     type: string
 *       404:
 *         description: User not found
 */
router.get("/:id", authMiddleware, roleMiddleware(["admin"]), getUserById);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: "Update a user by ID"
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               full_name:
 *                 type: string
 *                 example: "Updated Name"
 *               email:
 *                 type: string
 *                 example: "updated@example.com"
 *               password:
 *                 type: string
 *                 example: "newpassword"
 *               phone:
 *                 type: string
 *                 example: "0987654321"
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 */
router.put("/:id", authMiddleware, roleMiddleware(["admin"]), updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: "Delete a user by ID"
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete("/:id", authMiddleware, roleMiddleware(["admin"]), deleteUser);

export default router;
