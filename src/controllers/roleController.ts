import { Request, Response } from "express";
import { Role } from "../models/Role";

export const createRole = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const role = await Role.create({ name });
    res.status(201).json(role);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const getRoles = async (req: Request, res: Response) => {
  const roles = await Role.find();
  res.json(roles);
};

export const updateRole = async (req: Request, res: Response) => {
  const { id } = req.params;
  const role = await Role.findByIdAndUpdate(
    id,
    { name: req.body.name },
    { new: true }
  );
  res.json(role);
};

export const deleteRole = async (req: Request, res: Response) => {
  const { id } = req.params;
  await Role.findByIdAndDelete(id);
  res.json({ message: "Role deleted" });
};
