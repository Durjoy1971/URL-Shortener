import express from "express";
import userRouter from "./routes/user.routes";
import { authenticationMiddleware } from "./middleware/auth.middleware";
import urlRouter from "./routes/url.routes";

const app = express();
const port = process.env.PORT ?? 8000;

app.use(express.json());
app.use(authenticationMiddleware);
app.get("/", (req, res) => {
  return res.json("Hello, World!");
});

app.use("/", urlRouter);
app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
