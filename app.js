import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from './config/mongodb.js';
import swaggerUI from "swagger-ui-express";
import { swaggerDocs } from "./config/swagger.js";
import authRoutes from "./routes/authRoutes.js";
import { isAuthenticated } from "./middleware/auth.js";

const app = express();

app.use(express.json());
app.use(cors(
    {
        origin: 'http://localhost:3000',
        credentials: true
    }
));
app.use(cookieParser());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(isAuthenticated);
app.use("/api/auth", authRoutes);
// console.log(swaggerDocs);
dotenv.config();
const PORT = process.env.PORT || 5000;

connectDB().then((result) => {
    app.locals.db = result.db;
    app.listen(PORT, () => console.log("listening on 5000"));
}).catch((error) => {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
})