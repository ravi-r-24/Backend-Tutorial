import mongoose from "mongoose";

// connect to the database
const databaseConnection = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URI}/${process.env.DATABASE_NAME}`
        );
        console.log(`Connected to ${process.env.DATABASE_NAME} successfully`);
        console.log(`Host is: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log(
            `Failed to connect to ${connectionInstance.connection.host} due to:${error.message}`
        );
    }
};

export default databaseConnection;
