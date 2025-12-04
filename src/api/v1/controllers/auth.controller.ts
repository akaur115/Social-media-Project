/**
 * Auth Controller
 * Handles user registration and login.
 */

import { Request, Response } from "express";
import { register, login } from "../services/auth.service";

export async function registerUser(req: Request, res: Response): Promise<void> {
  try {
    const user = await register(req.body);
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

export async function loginUser(req: Request, res: Response): Promise<void> {
  try {
    const token = await login(req.body);
    res.status(200).json({ message: "Login successful", token });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}
