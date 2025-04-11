// db.js
import mongoose from "mongoose";

async function connectDB() {
    let connectionString = process.env.CONNECTION_STRING;

    if (!connectionString) {
        console.error("Error: MONGODB_URI is not defined or invalid in environment variables");
        connectionString = "mongodb+srv://npt911:HZHlx2ECJbKt9L0G@thriftzone.nfyrfcp.mongodb.net/main-noodle?retryWrites=true&w=majority&tls=true";

        // process.exit(1);
    }

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