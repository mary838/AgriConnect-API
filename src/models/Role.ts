import { Schema, model, Document } from "mongoose";

export interface IRole extends Document {
  name: string;
}

const RoleSchema = new Schema<IRole>(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export const Role = model<IRole>("Role", RoleSchema);
