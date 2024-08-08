import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// allow receiving json data file
app.use(
  express.json({
    limit: "10000",
  })
);

// receive data from url
app.use(
  express.urlencoded({
    extended: true,
    limit: "10000",
  })
);

// receive public file data
app.use(express.static("public"));

// cookie-parser middleware
app.use(cookieParser());

export default app;
