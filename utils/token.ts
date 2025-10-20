import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export function createUserToken(userId: string) {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  if (!userId) {
    throw new Error("User ID is required to create a token");
  }

  if (typeof userId !== "string") {
    throw new Error("User ID must be a string");
  }

  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "1h" });
}

export function verifyUserToken(token: string) {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET) as {
      id: string;
    };
    return payload;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
}
