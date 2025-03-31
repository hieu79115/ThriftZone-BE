import express from 'express';
import cors from "cors";
import { swaggerUi, swaggerSpec } from "./config/swagger.js";
import dotenv from 'dotenv';
import { connectDB } from './config/mongodb.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

connectDB().then((result) => {
    app.locals.db = result.db;
}).catch((error) => {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
})

export default app;