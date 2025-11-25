// src/routes/categoryRoutes.ts
import { Router } from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController";
import { authMiddleware, roleMiddleware } from "../middleware/authmiddleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Product category management
 */

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: "Create a new category"
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Fruit"
 *     responses:
 *       201:
 *         description: Category created
 */
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["admin", "farmer"]),
  createCategory
);

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: "Get all categories"
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: List of categories
 */
router.get("/", getAllCategories);

/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: "Get category by ID"
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category found
 *       404:
 *         description: Category not found
 */
router.get("/:id", getCategoryById);

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     summary: "Update category by ID"
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Vegetable"
 *     responses:
 *       200:
 *         description: Category updated
 *       404:
 *         description: Category not found
 */
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin", "farmer"]),
  updateCategory
);

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: "Delete category by ID"
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category deleted
 *       404:
 *         description: Category not found
 */
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin", "farmer"]),
  deleteCategory
);

export default router;
