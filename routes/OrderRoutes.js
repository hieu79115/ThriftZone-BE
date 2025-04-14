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
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const router = express.Router();

// Protected routes
router.use(authMiddleware);

/**
 * @swagger
 * /api/orders/create:
 *   post:
 *     summary: Create a new order
 *     description: Place a new order for an item
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               shippingAddressId:
 *                 type: string
 *               billingAddressId:
 *                 type: string
 *               itemId:
 *                 type: string
 *               paymentId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 */
router.post('/create', createOrder);

/**
 * @swagger
 * /api/orders/payment-callback:
 *   post:
 *     summary: Payment callback
 *     description: Handle payment gateway callback
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ordered:
 *                 type: string
 *               paymentResult:
 *                 type: object
 *     responses:
 *       200:
 *         description: Payment processed successfully
 *       400:
 *         description: Invalid payment data
 */
router.post('/payment-callback', getPaymentCallback);

/**
 * @swagger
 * /api/orders/shipping/{orderId}:
 *   put:
 *     summary: Update shipping information
 *     description: Update order with shipping tracking number
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: orderId
 *         in: path
 *         required: true
 *         description: Order ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               trackingNumber:
 *                 type: string
 *     responses:
 *       200:
 *         description: Shipping information updated
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Order not found
 */
router.put('/shipping/:orderId', updateShipOrder);

/**
 * @swagger
 * /api/orders/detail/{orderId}:
 *   get:
 *     summary: Get order details
 *     description: Retrieve details of a specific order
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: orderId
 *         in: path
 *         required: true
 *         description: Order ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order details
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - not the order owner
 *       404:
 *         description: Order not found
 */
router.get('/detail/:orderId', getOrder);

/**
 * @swagger
 * /api/orders/seller:
 *   get:
 *     summary: Get seller's orders
 *     description: Retrieve all orders for items sold by the authenticated user
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of seller's orders
 *       401:
 *         description: Unauthorized
 */
router.get('/seller', getOrdersBySeller);

/**
 * @swagger
 * /api/orders/cancel/{orderId}:
 *   delete:
 *     summary: Cancel order
 *     description: Cancel an existing order
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: orderId
 *         in: path
 *         required: true
 *         description: Order ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order cancelled successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - cannot cancel this order
 *       404:
 *         description: Order not found
 */
router.delete('/cancel/:orderId', cancelOrder);

/**
 * @swagger
 * /api/orders/all:
 *   get:
 *     summary: Get all orders
 *     description: Retrieve all orders (admin only)
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all orders
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - admin access required
 */
router.get('/all', adminMiddleware, getAllOrders);

export default router;