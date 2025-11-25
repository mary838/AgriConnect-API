import { User } from "../models/User";
import { Role } from "../models/Role";
import { UserRole } from "../models/UserRole";
import bcrypt from "bcrypt";

// Create user and assign roles
export const createUserService = async (data: {
  full_name: string;
  email: string;
  password: string;
  phone?: string;
}) => {
  // Hash password
  const hashedPassword = await bcrypt.hash(data.password, 10);

  // Create user
  const user = await User.create({ ...data, password: hashedPassword });

  // Assign roles (farmer + customer)
  const rolesToAssign = ["farmer", "customer"];
  const roleDocs = [];

  for (const roleName of rolesToAssign) {
    let role = await Role.findOne({ name: roleName });
    if (!role) {
      role = await Role.create({ name: roleName });
    }
    roleDocs.push(role);
  }

  // Insert into USER_ROLE
  await UserRole.insertMany(
    roleDocs.map((r) => ({ user_id: user._id, role_id: r._id }))
  );

  return {
    id: user._id,
    full_name: user.full_name,
    email: user.email,
    phone: user.phone,
    roles: roleDocs.map((r) => r.name),
  };
};

// Other CRUD services
export const getAllUsersService = async () => User.find();
export const getUserByIdService = async (id: string) => User.findById(id);
export const updateUserService = async (id: string, data: Partial<any>) => {
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }
  return User.findByIdAndUpdate(id, data, { new: true });
};
export const deleteUserService = async (id: string) =>
  User.findByIdAndDelete(id);
