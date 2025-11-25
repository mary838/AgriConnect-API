import { Product, IProduct } from "../models/Product";

export const createProductService = async (data: Partial<IProduct>) => {
  const product = await Product.create(data);
  return product;
};

export const getAllProductsService = async () => {
  return Product.find().populate("farmer_id", "full_name email");
};

export const getProductByIdService = async (id: string) => {
  return Product.findById(id).populate("farmer_id", "full_name email");
};

export const updateProductService = async (
  id: string,
  data: Partial<IProduct>
) => {
  return Product.findByIdAndUpdate(id, data, { new: true });
};

export const deleteProductService = async (id: string) => {
  return Product.findByIdAndDelete(id);
};
