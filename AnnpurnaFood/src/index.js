import { app } from "./app.js";
import dotenv from "dotenv";
import databaseConnection from "./db/index.js";

// config dotenv file
dotenv.config({
    path: "../.env",
});

// database connection
databaseConnection()
    .then(
        app.listen(process.env.PORT, () => {
            console.log(`Server is running at ${process.env.PORT}`);
        })
    )
    .catch((error) => {
        console.log(
            `Error while listening on ${process.env.PORT} due to ${error}`
        );
    });
