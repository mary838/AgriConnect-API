import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { Role } from "../models/Role";
import { UserRole } from "../models/UserRole";
import { tokenBlacklist } from "../utils/tokenBlacklist";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

// REGISTER (farmer or other roles)
export const register = async (req: Request, res: Response) => {
  try {
    const { full_name, email, password, phone, role = "customer" } = req.body;
    // Check if user already exists

    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("Email already registered");

    const hashedPassword = await bcrypt.hash(password, 10);
    // Create user

    const user = await User.create({
      full_name,
      email,
      password: hashedPassword,
      phone,
      status: "active",
    });
    // Assign role to user

    const roleDoc = await Role.findOne({ name: role });
    if (roleDoc) {
      await UserRole.create({ user_id: user._id, role_id: roleDoc._id });
    }

    const userRoles = await UserRole.find({ user_id: user._id }).populate(
      "role_id"
    );
    const roleNames = userRoles.map((ur) => (ur.role_id as any).name);

    const token = jwt.sign({ id: user._id, roles: roleNames }, JWT_SECRET, {
      expiresIn: "12h",
    });
    // Respond with token and user info
    res.status(201).json({
      message: "User registered successfully",
      token,
      user: { id: user._id, full_name, email, phone, roles: roleNames },
    });
    // Error handlings
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// LOGIN
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid email or password");
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid email or password");

    const userRoles = await UserRole.find({ user_id: user._id }).populate(
      "role_id"
    );
    // Extract role names
    const roleNames = userRoles.map((ur) => (ur.role_id as any).name);
    if (roleNames.includes("admin")) {
      ["farmer", "customer"].forEach((r) => {
        if (!roleNames.includes(r)) roleNames.push(r);
      });
    }

    const token = jwt.sign({ id: user._id, roles: roleNames }, JWT_SECRET, {
      expiresIn: "12h",
    });
    // Respond with token and user info
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        full_name: user.full_name,
        email,
        phone: user.phone,
        roles: roleNames,
      },
    });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// LOGOUT
export const logout = (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  // Invalidate token by adding it to blacklist
  const token = authHeader.split(" ")[1];
  tokenBlacklist.add(token);

  res.status(200).json({ message: "Logged out successfully" });
};
