import express from "express";
import restaurantRouter from "./routes/restaurant.js";

const app = express();

// Restaurant Routes
app.use("/api/v1/restaurant", restaurantRouter);

export { app };
