import express, { Request } from "express";
import { shortenedPostRequestBodySchema } from "../validation/request.validation";
import { flattenError } from "zod";
import db from "../db/index";
import { urlsTable } from "../models";
import { nanoid } from "nanoid";

const urlRouter = express.Router();

urlRouter.post("/shorten", async (req: Request, res) => {
  const userID = req.user?.id || null;

  if (!userID) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized Access detected" });
  }

  const validationResult = await shortenedPostRequestBodySchema.safeParseAsync(
    req.body
  );

  if (validationResult.error) {
    return res
      .status(400)
      .json({ success: false, message: flattenError(validationResult.error) });
  }

  const { originalUrl, code } = validationResult.data;

  // return res.status(201).json({
  //   success: true,
  //   data: {
  //     originalUrl,
  //     code,
  //   },
  // });

  const shortCode = code || nanoid(6);

  const [result] = await db
    .insert(urlsTable)
    .values({
      shortCode,
      targetURL: originalUrl,
      userId: userID,
    })
    .returning({
      id: urlsTable.id,
      shortCode: urlsTable.shortCode,
      targetURL: urlsTable.targetURL,
    });

  return res.status(201).json({
    success: true,
    data: {
      id: result.id,
      shortCode: result.shortCode,
      targetURL: result.targetURL,
    },
  });
});

export default urlRouter;
