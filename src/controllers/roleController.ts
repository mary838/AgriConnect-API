// // controllers/roleController.ts
// import { Request, Response } from "express";
// import { Role } from "../models/Role";

// export const createRole = async (req: Request, res: Response) => {
//   try {
//     const { name } = req.body;
//     if (!name)
//       return res.status(400).json({ message: "Role name is required" });

//     const exists = await Role.findOne({ name: name.toLowerCase() });
//     if (exists) return res.status(400).json({ message: "Role already exists" });

//     const role = await Role.create({ name: name.toLowerCase() });
//     res.status(201).json({ message: "Role created", role });
//   } catch (err: any) {
//     res.status(500).json({ message: err.message });
//   }
// };

// export const getRoles = async (req: Request, res: Response) => {
//   try {
//     const roles = await Role.find().sort({ name: 1 });
//     res.status(200).json({ roles });
//   } catch (err: any) {
//     res.status(500).json({ message: err.message });
//   }
// };
import { Request, Response } from "express";
import { Role } from "../models/Role";

export const getRoles = async (req: Request, res: Response) => {
  try {
    const roles = await Role.find().sort({ name: 1 }); // sorted alphabetically
    res.status(200).json({ roles });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const createRole = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Role name required" });

    const exists = await Role.findOne({ name: name.toLowerCase() });
    if (exists) return res.status(400).json({ message: "Role already exists" });

    const role = await Role.create({ name: name.toLowerCase() });
    res.status(201).json({ message: "Role created", role });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
