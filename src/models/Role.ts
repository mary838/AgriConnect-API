// import mongoose, { Schema, Document } from "mongoose";

// export interface IRole extends Document {
//   name: string;
// }

// const RoleSchema: Schema = new Schema(
//   { name: { type: String, required: true, unique: true } },
//   { timestamps: true }
// );

// export const Role =
//   mongoose.models.Role || mongoose.model<IRole>("Role", RoleSchema);
import mongoose, { Schema, Document } from "mongoose";

interface IRole extends Document {
  name: string;
}

const roleSchema = new Schema<IRole>({
  name: { type: String, required: true, unique: true },
});

export const Role = mongoose.model<IRole>("Role", roleSchema);
