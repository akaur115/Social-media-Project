/**
 * @file user.controller.ts
 * @description Controller for User authentication and profile operations
 */

import { Request, Response } from "express";
import admin from "../../../config/firebase";
import {
  createUser,
  getUserByEmail,
  getUserById,
  updateUserPhoto
} from "../repositories/user.repository";

/**
 * Register a new user
 */
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if already exists
    const existing = await getUserByEmail(email);
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Create Firebase Auth user
    const userRecord = await admin.auth().createUser({
      email,
      password
    });

    // Save in Firestore
    const newUser = await createUser({
      id: userRecord.uid,
      email,
      role: "user" // default role
    } as any);

    res.status(201).json({ message: "User registered", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

/**
 * Login User
 */
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    // Check user in Firestore
    const user = await getUserByEmail(email);
    if (!user)
      return res.status(404).json({ message: "User not found" });

    // Generate Firebase Custom Token
    const token = await admin.auth().createCustomToken(user.id!);

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Login error", error });
  }
};

/**
 * Get User by ID
 */
export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const user = await getUserById(req.params.id);

    if (!user)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};

/**
 * Upload Profile Photo
 */
export const uploadPhoto = async (req: Request, res: Response) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: "No file uploaded" });

    const url = req.file.path;

    await updateUserPhoto(req.params.id, url);

    res.status(200).json({ message: "Photo updated", url });
  } catch (error) {
    res.status(500).json({ message: "Error uploading photo", error });
  }
};

/**
 * Delete User (ADMIN ONLY)
 */
export const deleteUser = async (req: Request, res: Response) => {
  try {
    await admin.auth().deleteUser(req.params.id);
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};
