import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { tokenBlacklist } from "../utils/tokenBlacklist";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

// Auth middleware
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  if (tokenBlacklist.has(token)) {
    return res.status(401).json({ message: "Token expired or logged out" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Role middleware
export const roleMiddleware = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !req.user.roles) {
      return res.status(403).json({ message: "Access denied" });
    }

    const hasRole = req.user.roles.some((r: string) => roles.includes(r));
    if (!hasRole) {
      return res.status(403).json({ message: "Forbidden: insufficient role" });
    }

    next();
  };
};
