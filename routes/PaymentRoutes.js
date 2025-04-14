import express from "express";
import {
    createPaymentIntent,
    verifyPayment,
    getPaymentMethods,
    addPaymentMethod,
    removePaymentMethod
} from "../controllers/PaymentController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes are protected
router.use(authMiddleware);

/**
 * @swagger
 * /api/payments/create-intent:
 *   post:
 *     summary: Create payment intent
 *     description: Initialize a payment transaction for an item purchase
 *     tags:
 *       - Payments
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               itemId:
 *                 type: string
 *                 description: ID of the item to purchase
 *     responses:
 *       201:
 *         description: Payment intent created successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Item not found
 */
router.post('/create-intent', createPaymentIntent);

/**
 * @swagger
 * /api/payments/verify:
 *   post:
 *     summary: Verify payment
 *     description: Verify a completed payment transaction
 *     tags:
 *       - Payments
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               paymentId:
 *                 type: string
 *               orderId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Payment verified successfully
 *       400:
 *         description: Invalid payment data
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Payment or order not found
 */
router.post('/verify', verifyPayment);

/**
 * @swagger
 * /api/payments/methods:
 *   get:
 *     summary: Get payment methods
 *     description: Retrieve all saved payment methods for the authenticated user
 *     tags:
 *       - Payments
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of payment methods
 *       401:
 *         description: Unauthorized
 */
router.get('/methods', getPaymentMethods);

/**
 * @swagger
 * /api/payments/method:
 *   post:
 *     summary: Add payment method
 *     description: Save a new payment method for the authenticated user
 *     tags:
 *       - Payments
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cardNumber:
 *                 type: string
 *               expirationDate:
 *                 type: string
 *               cardholderName:
 *                 type: string
 *               isDefault:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Payment method added successfully
 *       400:
 *         description: Invalid payment method data
 *       401:
 *         description: Unauthorized
 */
router.post('/method', addPaymentMethod);

/**
 * @swagger
 * /api/payments/method/{methodId}:
 *   delete:
 *     summary: Remove payment method
 *     description: Delete a saved payment method
 *     tags:
 *       - Payments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: methodId
 *         in: path
 *         required: true
 *         description: Payment method ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment method removed successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - not the payment method owner
 *       404:
 *         description: Payment method not found
 */
router.delete('/method/:methodId', removePaymentMethod);

export default router;