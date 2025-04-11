import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from './config/mongoose.js';
import swaggerUI from "swagger-ui-express";
import { swaggerDocs } from "./config/swagger.js";
import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 3600000 }
}));

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use("/api/auth", authRoutes);
app.use("/api/order",orderRoutes);
// console.log(swaggerDocs);
dotenv.config();
const PORT = process.env.PORT || 5001;

connectDB().then((result) => {
    app.locals.db = result.db;
    app.listen(PORT, () => console.log(`listening on ${PORT}`));
}).catch((error) => {
    console.error("Mongoose connection failed:", error);
    process.exit(1);
})