import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getUserByEmail } from "../repositories/user.repository";
import { LoginInput } from "../models/auth.model";

const JWT_SECRET = "supersecret123"; 

export const authService = {
  /**
   * Validates user credentials and returns JWT token.
   */
  async login(data: LoginInput): Promise<string | null> {
    const user = await getUserByEmail(data.email);
    if (!user) return null;

    const validPassword = await bcrypt.compare(data.password, user.password);
    if (!validPassword) return null;

    const token = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return token;
  },
};
