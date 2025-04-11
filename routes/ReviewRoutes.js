import express from "express";
import {
    createReview,
    getReviewsForItem,
    getReviewsForSeller, 
    getUserReviews,
    updateReview,
    deleteReview
} from "../controllers/ReviewController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/reviews/item/{itemId}:
 *   get:
 *     summary: Get reviews for an item
 *     description: Retrieve all reviews for a specific item
 *     tags:
 *       - Reviews
 *     parameters:
 *       - name: itemId
 *         in: path
 *         required: true
 *         description: Item ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of reviews for the item
 *       404:
 *         description: Item not found
 */
router.get('/item/:itemId', getReviewsForItem);

/**
 * @swagger
 * /api/reviews/seller/{sellerId}:
 *   get:
 *     summary: Get reviews for a seller
 *     description: Retrieve all reviews for a specific seller
 *     tags:
 *       - Reviews
 *     parameters:
 *       - name: sellerId
 *         in: path
 *         required: true
 *         description: Seller user ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of reviews for the seller
 *       404:
 *         description: Seller not found
 */
router.get('/seller/:sellerId', getReviewsForSeller);

// Protected routes
router.use(authMiddleware);

/**
 * @swagger
 * /api/reviews/create:
 *   post:
 *     summary: Create a review
 *     description: Add a new review for an item or seller
 *     tags:
 *       - Reviews
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
 *               sellerId:
 *                 type: string
 *               rating:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *               comment:
 *                 type: string
 *     responses:
 *       201:
 *         description: Review created successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - you must purchase the item first
 */
router.post('/create', createReview);

/**
 * @swagger
 * /api/reviews/user:
 *   get:
 *     summary: Get user reviews
 *     description: Retrieve all reviews written by the authenticated user
 *     tags:
 *       - Reviews
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's reviews
 *       401:
 *         description: Unauthorized
 */
router.get('/user', getUserReviews);

/**
 * @swagger
 * /api/reviews/{id}:
 *   put:
 *     summary: Update review
 *     description: Update an existing review
 *     tags:
 *       - Reviews
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Review ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *               comment:
 *                 type: string
 *     responses:
 *       200:
 *         description: Review updated successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - not the review owner
 *       404:
 *         description: Review not found
 */
router.put('/:id', updateReview);

/**
 * @swagger
 * /api/reviews/{id}:
 *   delete:
 *     summary: Delete review
 *     description: Delete an existing review
 *     tags:
 *       - Reviews
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Review ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - not the review owner
 *       404:
 *         description: Review not found
 */
router.delete('/:id', deleteReview);

export default router;