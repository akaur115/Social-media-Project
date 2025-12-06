import { User } from "../models/user.model";
import {
  createUser,
  getUserById,
  updateUserPhoto,
} from "../repositories/user.repository";

export const userService = {
  /**
   * Creates a new user.
   */
  create: async (data: User): Promise<User> => {
    return await createUser(data);
  },

  /**
   * Fetches a user by Firestore ID.
   */
  getById: async (id: string): Promise<User | null> => {
    return await getUserById(id);
  },

  /**
   * Updates the profile picture URL in Firestore.
   */
  updatePhoto: async (id: string, photoUrl: string): Promise<void> => {
    return await updateUserPhoto(id, photoUrl);
  },
};
