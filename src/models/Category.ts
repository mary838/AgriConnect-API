import { Schema, model, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  created_at: Date;
}

const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true, unique: true },
  created_at: { type: Date, default: Date.now },
});

export const Category = model<ICategory>("Category", categorySchema);
