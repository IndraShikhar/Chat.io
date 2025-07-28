import express from "express";
import cors from "cors";

import globalErrorHandler from "./controllers/errorController.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import conversationRouter from "./routes/conversationRouter.js";

const app = express();

const allowedOrigins = [
  "https://chat-io-git-main-indrashikhars-projects.vercel.app/",
  "https://chat-io-ten.vercel.app/",
  "https://chat-io-indrashikhars-projects.vercel.app/",
  "http://localhost:5173", // For local development
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error(`CORS Error: ${origin} not allowed`));
    }
  },
  credentials: true, // If you want to allow cookies or HTTP auth
};

app.use(cors(corsOptions));

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );
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
