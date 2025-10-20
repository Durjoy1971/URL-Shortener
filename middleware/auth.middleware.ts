import { NextFunction, Request, Response } from "express";
import { verifyUserToken } from "../utils/token";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export function authenticationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return next();
  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Authorization header must start with Bearer",
    });
  }

  const token = authHeader.split(" ")[1]; // [Bearer, token]

  const payload = verifyUserToken(token);

  req.user = payload;
  next();
}
