import type { NextFunction, Request, Response } from "express";
import { registerUser } from "./auth.service.js";
import { registerSchema } from "./auth.schema.js";

export const register = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const validationResult = registerSchema.safeParse(request.body);

  if (!validationResult.success) {
    return response.status(400).json({
      message: "Validation failed",
      errors: validationResult.error.issues,
    });
  }

  try {
    const result = await registerUser(validationResult.data);

    return response.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};
