import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express(); // created express server instance

// Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// middleware to allow receiving json data file
app.use(
  express.json({
    limit: "10000",
  })
);

// middleware to receive data from url
app.use(
  express.urlencoded({
    extended: true,
    limit: "10000",
  })
);

// middleware to receive public file data
app.use(express.static("public"));

// cookie-parser middleware
app.use(cookieParser());

// routes import
import userRouter from "./routes/user.js";

// user routes declaration
app.use("/api/v1/user", userRouter);

export default app;
