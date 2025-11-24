// import mongoose, { Schema, Document } from "mongoose";

// export interface IUserRole extends Document {
//   user_id: mongoose.Types.ObjectId;
//   role_id: mongoose.Types.ObjectId;
// }

// const UserRoleSchema: Schema = new Schema(
//   {
//     user_id: { type: Schema.Types.ObjectId, required: true, ref: "User" },
//     role_id: { type: Schema.Types.ObjectId, required: true, ref: "Role" },
//   },
//   { timestamps: true }
// );

// export const UserRole =
//   mongoose.models.UserRole ||
//   mongoose.model<IUserRole>("UserRole", UserRoleSchema);
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUserRole extends Document {
  user_id: mongoose.Types.ObjectId;
  role_id: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserRoleSchema: Schema<IUserRole> = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    role_id: { type: Schema.Types.ObjectId, required: true, ref: "Role" },
  },
  { timestamps: true }
);

export const UserRole: Model<IUserRole> =
  mongoose.models.UserRole ||
  mongoose.model<IUserRole>("UserRole", UserRoleSchema);
