/**
 * Auth Controller
 * Handles user login and token creation.
 */

import { Request, Response } from "express";
import { authService } from "../services/auth.service";

export const authController = {
  async login(req: Request, res: Response): Promise<void> {
    const token = await authService.login(req.body);

    if (!token) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    res.json({ token });
  },
};
