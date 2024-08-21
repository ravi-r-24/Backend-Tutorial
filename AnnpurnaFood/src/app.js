import express from "express";
import restaurantRouter from "./routes/restaurant.js";
import userRouter from "./routes/user.js";

const app = express();

// middlewares
app.use(
    express.json({
        limit: "10000",
    })
);

// Restaurant Routes
app.use("/api/v1/restaurant", restaurantRouter);

// User Routes
app.use("/api/v1/user", userRouter);

export { app };
