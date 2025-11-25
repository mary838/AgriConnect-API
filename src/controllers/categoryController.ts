import { Request, Response } from "express";
import { Category } from "../models/Category";

// Create category
export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const category = await Category.create({ name });
    res.status(201).json(category);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Get all categories
export const getAllCategories = async (_req: Request, res: Response) => {
  const categories = await Category.find();
  res.json(categories);
};

// Get category by ID
export const getCategoryById = async (req: Request, res: Response) => {
  const category = await Category.findById(req.params.id);
  if (!category) return res.status(404).json({ message: "Category not found" });
  res.json(category);
};

// Update category
export const updateCategory = async (req: Request, res: Response) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!category) return res.status(404).json({ message: "Category not found" });
  res.json(category);
};

// Delete category
export const deleteCategory = async (req: Request, res: Response) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ message: "Category deleted" });
};
