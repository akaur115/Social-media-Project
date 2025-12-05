import { Request, Response, NextFunction } from "express";
import admin from "../../../config/firebase";

export interface AuthUser {
  uid: string;
  email: string;
  role?: "admin" | "user";
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export const authRequired = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = await admin.auth().verifyIdToken(token);

    req.user = {
      uid: decoded.uid,
      email: decoded.email!,
      role: decoded.role as "admin" | "user",
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
