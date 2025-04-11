// db.js
import mongoose from "mongoose";

async function connectDB() {
    const connectionString = process.env.CONNECTION_STRING;

    // Validate connection string
    if (!connectionString || typeof connectionString !== "string") {
        console.error("Error: MONGODB_URI is not defined or invalid in environment variables");
        process.exit(1);
    }

    // Singleton connection
    if (!connectDB.database) {
        try {
            connectDB.database = await mongoose.connect(connectionString, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log(`Connected to database\nConnection string: ${connectionString}`);
        } catch (error) {
            console.error("MongoDB connection failed:", error);
            process.exit(1);
        }
    } else {
        console.log(`Already connected to database\nConnection string: ${connectionString}`);
    }

    return connectDB.database;
}

connectDB.database = null;

export { connectDB };