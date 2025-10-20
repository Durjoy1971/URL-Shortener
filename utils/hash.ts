import { createHmac, randomBytes } from "crypto";

export function hashPasswordWithSalt(password: string, userSalt?: string) {
  const salt = userSalt ?? randomBytes(256).toString("hex");
  const hashedPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  return { hashedPassword, salt };
}
