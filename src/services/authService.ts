// src/services/authService.ts
import bcrypt from "bcrypt";
import jwt, { SignOptions, Secret } from "jsonwebtoken";
import { User } from "../models/User";
import { Role } from "../models/Role";
import { UserRole } from "../models/UserRole";

const JWT_SECRET: Secret = process.env.JWT_SECRET || "secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "12h";

interface RegisterInput {
  full_name: string;
  email: string;
  password: string;
  phone?: string;
}

interface LoginInput {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: string;
    full_name: string;
    email: string;
    phone?: string;
    roles: string[];
  };
}

export const registerService = async (
  data: RegisterInput
): Promise<AuthResponse> => {
  const { full_name, email, password, phone } = data;

  // Check if email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("Email already registered");

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await User.create({
    full_name,
    email,
    password: hashedPassword,
    phone,
    status: "active",
  });

  // Assign 'customer' role automatically
  const customerRole = await Role.findOne({ name: "customer" });
  if (customerRole) {
    await UserRole.create({ user_id: user._id, role_id: customerRole._id });
  }

  // Get all role names for the user
  const rolesDocs = await UserRole.find({ user_id: user._id }).populate(
    "role_id"
  );
  const roleNames = rolesDocs.map((r) => (r.role_id as any).name);

  // Generate JWT token
  const token = jwt.sign({ id: user._id, roles: roleNames }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  } as SignOptions);

  return {
    token,
    user: {
      id: user._id.toString(),
      full_name: user.full_name,
      email: user.email,
      phone: user.phone,
      roles: roleNames,
    },
  };
};

export const loginService = async (data: LoginInput): Promise<AuthResponse> => {
  const { email, password } = data;

  const user = await User.findOne({ email });
  if (!user || !user.password) throw new Error("Invalid email or password");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid email or password");

  // Get all role names for the user
  const rolesDocs = await UserRole.find({ user_id: user._id }).populate(
    "role_id"
  );
  const roleNames = rolesDocs.map((r) => (r.role_id as any).name);

  // Generate JWT token
  const token = jwt.sign({ id: user._id, roles: roleNames }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  } as SignOptions);

  return {
    token,
    user: {
      id: user._id.toString(),
      full_name: user.full_name,
      email: user.email,
      phone: user.phone,
      roles: roleNames,
    },
  };
};
