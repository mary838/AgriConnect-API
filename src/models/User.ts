// src/models/User.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  full_name: string;
  email: string;
  password: string;
  phone: string;
  status: string;
  created_at: Date;
  updated_at: Date;
}

const UserSchema: Schema = new Schema(
  {
    full_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    status: { type: String, default: "active" },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", UserSchema);
