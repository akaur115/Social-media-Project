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
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({
        message: "email, password, and username are required",
      });
    }

    const existing = await getUserByEmail(email);
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Create user in Firebase Auth
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    // Save user in Firestore
    const newUser = await createUser({
      id: userRecord.uid,
      username,
      email,
      role: "user",
      createdAt: Date.now(),
      password: "",
    });

    return res.status(201).json({
      message: "User registered",
      user: newUser,
    });

  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ message: "Error registering user" });
  }
};

/**
 * Login User
 */
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await getUserByEmail(email);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate Firebase Custom Token
    const token = await admin.auth().createCustomToken(user.id!);

    res.status(200).json({
      message: "Login successful",
      token,
    });

  } catch (error) {
    res.status(500).json({ message: "Login error", error });
  }
};

/**
 * Get User Profile
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
 * Get All Users
 */
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const usersSnapshot = await admin.firestore().collection("users").get();

    const users = usersSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

/**
 * Upload Profile Photo (LOCAL UPLOAD VERSION)
 */
export const uploadPhoto = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Local uploaded file location
    const url = `/uploads/${req.file.filename}`;

    // Save URL in Firestore
    await updateUserPhoto(req.params.id, url);

    res.status(200).json({
      message: "Photo uploaded successfully",
      url,
    });

  } catch (error) {
    console.error("Upload error:", error);
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
