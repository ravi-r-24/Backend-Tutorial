import { app } from "./app.js";
import dotenv from "dotenv";

// config dotenv file
dotenv.config({
    path: "../.env",
});

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on ${process.env.PORT}`);
});
