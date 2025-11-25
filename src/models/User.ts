import { Schema, model, Document, Types } from "mongoose";

export interface IUser extends Document {
  full_name: string;
  email: string;
  password: string;
  phone?: string;
  roles: Types.ObjectId[];
}

const UserSchema = new Schema<IUser>(
  {
    full_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
  },
  { timestamps: true }
);

export const User = model<IUser>("User", UserSchema);

/// getapi  /products
// postapi /products/id
// put api / product
// delete api / product/id
// patch api / product/id
