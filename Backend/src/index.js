import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";

// configure .env file
dotenv.config({
  path: "../.env",
});

// db connection
connectDB()
  .then(
    app.listen(process.env.PORT || 8080, () => {
      console.log(`Server is running at ${process.env.PORT}`);
    })
  )
  .catch((error) => {
    console.log(`Mongo database connection failed: ${error}`);
  });
