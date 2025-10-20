import express from "express";
import {
  loginPostRequestBodySchema,
  signupPostRequestBodySchema,
} from "../validation/request.validation";
import { flattenError } from "zod";
import { hashPasswordWithSalt } from "../utils/hash";
import { createUser, getUserByEmail } from "../services/user.service";
import { createUserToken } from "../utils/token";

const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  const validationResult = await signupPostRequestBodySchema.safeParseAsync(
    req.body
  );

  if (validationResult.error) {
    return res
      .status(400)
      .json({ success: false, message: flattenError(validationResult.error) });
  }

  const { firstname, lastname, email, password } = validationResult.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: `User with email ${email} already exists`,
    });
  }

  const { hashedPassword, salt } = hashPasswordWithSalt(password);

  const user = await createUser(
    firstname,
    lastname,
    email,
    hashedPassword,
    salt
  );

  return res.status(201).json({ data: { userId: user.id } });
});

userRouter.post("/login", async (req, res) => {
  const validationResult = await loginPostRequestBodySchema.safeParseAsync(
    req.body
  );

  if (validationResult.error) {
    return res
      .status(400)
      .json({ success: false, message: flattenError(validationResult.error) });
  }

  const { email, password } = validationResult.data;
  const user = await getUserByEmail(email);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: `User with email ${email} does not exists`,
    });
  }

  const { hashedPassword } = hashPasswordWithSalt(password, user.salt);

  if (hashedPassword !== user.password) {
    return res.status(401).json({
      success: false,
      message: `Invalid credentials`,
    });
  }

  const token = createUserToken(user.id);

  return res.status(200).json({ data: { token }, success: true });
});

export default userRouter;
