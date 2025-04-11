import express from "express";
import {
    createReview,
    getReviewsForItem,
    getReviewsForSeller, 
    getUserReviews,
    updateReview,
    deleteReview
} from "../controllers/ReviewController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public routes
router.get('/item/:itemId', getReviewsForItem);
router.get('/seller/:sellerId', getReviewsForSeller);

// Protected routes
router.use(authMiddleware);
router.post('/create', createReview);
router.get('/user', getUserReviews);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);

export default router;