import { Request, Response, NextFunction } from "express";

export const roleMiddleware = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const u = (req as any).user;
    if (!u) return res.status(401).json({ message: "Not authenticated" });

    const has = (u.roles || []).some((r: string) => allowedRoles.includes(r));
    if (!has) return res.status(403).json({ message: "Forbidden" });

    next();
  };
};
