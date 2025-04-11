import {createOrder} from "../controllers/OrderController.js";
import express from "express";
const router = express.Router();

router.post('/create', createOrder)

export default router;
