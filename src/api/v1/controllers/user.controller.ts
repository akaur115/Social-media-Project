import { Request, Response } from "express";
import { userService } from "../services/user.service";
import { uploadToStorage } from "../services/upload.service";

export const userController = {
  /**
   * Create a new user.
   */
  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await userService.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to create user" });
    }
  },

  /**
   * Get user by ID.
   */
  async getUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await userService.getById(req.params.id);
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.json(user);
    } catch {
      res.status(500).json({ message: "Failed to fetch user" });
    }
  },

  /**
   * Upload profile picture.
   */
  async uploadPhoto(req: Request, res: Response): Promise<void> {
    try {
      const file = (req as any).file;

      if (!file) {
        res.status(400).json({ message: "No file provided" });
        return;
      }

      const url = await uploadToStorage(file, "profile-photos");
      await userService.updatePhoto(req.params.id, url);

      res.json({ photoUrl: url });
    } catch (error) {
      res.status(500).json({ message: "Failed to upload profile photo" });
    }
  },
};
