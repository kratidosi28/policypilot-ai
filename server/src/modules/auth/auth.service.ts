import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { db } from "../../database/index.js";
import { users } from "../../database/schema.js";
import type { RegisterInput } from "../auth/auth.schema.js";

export const registerUser = async (input: RegisterInput) => {
  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, input.email),
  });

  if (existingUser) {
    return {
      success: false,
      statusCode: 409,
      message: "An account with this email already exists",
    };
  }

  const passwordHash = await bcrypt.hash(input.password, 12);

  const [user] = await db
    .insert(users)
    .values({
      name: input.name,
      email: input.email,
      passwordHash,
    })
    .returning({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
      createdAt: users.createdAt,
    });

  return {
    success: true,
    statusCode: 201,
    message: "User registered successfully",
    user,
  };
};
