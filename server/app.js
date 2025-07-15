import express from "express";
import cors from "cors";

import globalErrorHandler from "./controllers/errorController.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import conversationRouter from "./routes/conversationRouter.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.url, new Date().toISOString());
  next();
});

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Hello from the test server of Chat.io",
  });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/conversations", conversationRouter);

app.use(globalErrorHandler);

export default app;
