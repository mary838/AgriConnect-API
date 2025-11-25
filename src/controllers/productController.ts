import { Request, Response } from "express";
import { Product } from "../models/Product";

// Create Product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, stock, category, status } = req.body;
    const farmer_id = req.user.id; // from authMiddleware
    const product = await Product.create({
      name,
      price,
      stock,
      category,
      status,
      farmer_id,
    });
    res.status(201).json(product);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Get All Products
export const getAllProducts = async (_req: Request, res: Response) => {
  const products = await Product.find();
  res.json(products);
};

// Get Product by ID
export const getProductById = async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
};

// Update Product
export const updateProduct = async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });

  // Only farmer owner or admin can update
  if (
    req.user.roles.includes("farmer") &&
    product.farmer_id.toString() !== req.user.id &&
    !req.user.roles.includes("admin")
  ) {
    return res.status(403).json({ message: "Forbidden: not your product" });
  }

  Object.assign(product, req.body);
  await product.save();
  res.json(product);
};

// Delete Product
export const deleteProduct = async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });

  // Only farmer owner or admin can delete
  if (
    req.user.roles.includes("farmer") &&
    product.farmer_id.toString() !== req.user.id &&
    !req.user.roles.includes("admin")
  ) {
    return res.status(403).json({ message: "Forbidden: not your product" });
  }

  await product.deleteOne();
  res.json({ message: "Product deleted" });
};
