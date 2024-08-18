import express from "express";
import restaurantRouter from "./routes/restaurant.js";

const app = express();

// middlewares
app.use(
    express.json({
        limit: "10000",
    })
);

// Restaurant Routes
app.use("/api/v1/restaurant", restaurantRouter);

export { app };
