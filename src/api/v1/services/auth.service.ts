import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createUser, getUserByEmail } from "../repositories/user.repository";

interface RegisterInput {
  username: string;
  email: string;
  password: string;
}

interface LoginInput {
  email: string;
  password: string;
}

/**
 * Registers a new user.
 */
export async function register(data: RegisterInput) {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const newUser = await createUser({
      username: data.username,
      email: data.email,
      password: hashedPassword,
      role: "user",
      createdAt: Date.now()
  });

  return newUser;
}

/**
 * Logs in a user and returns a JWT token.
 */
export async function login(data: LoginInput): Promise<string | null> {
  const user = await getUserByEmail(data.email);

  if (!user) return null;

  const passwordMatch = await bcrypt.compare(data.password, user.password);

  if (!passwordMatch) return null;

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET || "secret",
    { expiresIn: "1h" }
  );

  return token;
}

export const authService = { register, login };
export default authService;
