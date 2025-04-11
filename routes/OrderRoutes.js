import express from "express";
import { 
    createOrder, 
    getPaymentCallback, 
    updateShipOrder, 
    getOrder,
    getAllOrders,
    getOrdersBySeller,
    cancelOrder 
} from "../controllers/OrderController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();


router.use(authMiddleware);
router.post('/create', createOrder);
router.post('/payment-callback', getPaymentCallback);
router.put('/shipping/:orderId', updateShipOrder);
router.get('/detail/:orderId', getOrder);
router.get('/seller', getOrdersBySeller);
router.delete('/cancel/:orderId', cancelOrder);

router.get('/all', getAllOrders); 

export default router;