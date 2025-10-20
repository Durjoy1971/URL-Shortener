import { z } from "zod";

export const signupPostRequestBodySchema = z.object({
  firstname: z.string().min(3, "First name is required"),
  lastname: z.string().min(3, "Last name is required"),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const loginPostRequestBodySchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const shortenedPostRequestBodySchema = z.object({
  originalUrl: z.url("Invalid URL format").min(6, "URL is too short"),
  code: z.string().min(3, "Code must be at least 3 characters long").optional(),
});