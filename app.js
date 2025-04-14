import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables first
dotenv.config();

import { connectDB } from './config/mongoose.js';
import swaggerUI from "swagger-ui-express";
import { swaggerDocs } from "./config/swagger.js";

// Import routes
import authRoutes from "./routes/AuthRoutes.js";
import userRoutes from "./routes/UserRoutes.js";
import itemRoutes from "./routes/ItemRoutes.js";
import orderRoutes from "./routes/OrderRoutes.js";
import addressRoutes from "./routes/AddressRoutes.js";
import paymentRoutes from "./routes/PaymentRoutes.js";
import reviewRoutes from "./routes/ReviewRoutes.js";
import categoryRoutes from "./routes/CategoryRoutes.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors(
    {
        origin: 'http://localhost:3000',
        credentials: true
    }
));
app.use(cookieParser());

app.use(session({
    secret: process.env.SESSION_SECRET || 'thriftzone-secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production', maxAge: 3600000 }
}));

// API Documentation
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));


// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/categories", categoryRoutes);

app.get("/api", (req, res) => {
    res.status(200).json({ message: "ThriftZone API is running" });
});

const PORT = process.env.PORT || 5001;

connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT} \n link: http://localhost:${PORT}/api-docs`));

}).catch((error) => {
    console.error("Database connection failed:", error);
    process.exit(1);
});