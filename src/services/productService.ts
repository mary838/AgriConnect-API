import { Product, IProduct } from "../models/Product";
// Service functions for Product operations
export const createProductService = async (data: Partial<IProduct>) => {
  const product = await Product.create(data);
  return product;
};
// Get all products
export const getAllProductsService = async () => {
  return Product.find().populate("farmer_id", "full_name email");
};
// Get product by ID
export const getProductByIdService = async (id: string) => {
  return Product.findById(id).populate("farmer_id", "full_name email");
};
// Update product
export const updateProductService = async (
  id: string,
  data: Partial<IProduct>
) => {
  return Product.findByIdAndUpdate(id, data, { new: true });
};
// Delete product
export const deleteProductService = async (id: string) => {
  return Product.findByIdAndDelete(id);
};
