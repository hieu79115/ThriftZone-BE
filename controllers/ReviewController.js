import ReviewService from '../services/ReviewService.js';
const reviewService = new ReviewService();

const createReview = async (req, res) => {
    try {
        const review = await reviewService.createReview({
            ...req.body,
            userId: req.user._id
        });
        res.status(201).json(review);
    } catch (err) {
        res.status(400).json(err);
    }
};

const getReviewsForItem = async (req, res) => {
    try {
        const reviews = await reviewService.getReviewsByItem(req.params.itemId);
        res.status(200).json(reviews);
    } catch (err) {
        res.status(400).json(err);
    }
};

const getReviewsForSeller = async (req, res) => {
    try {
        const reviews = await reviewService.getReviewsBySeller(req.params.sellerId);
        res.status(200).json(reviews);
    } catch (err) {
        res.status(400).json(err);
    }
};

const getUserReviews = async (req, res) => {
    try {
        const reviews = await reviewService.getReviewsByUser(req.user._id);
        res.status(200).json(reviews);
    } catch (err) {
        res.status(400).json(err);
    }
};

const updateReview = async (req, res) => {
    try {
        const review = await reviewService.updateReview(
            req.params.id,
            req.body,
            req.user._id
        );
        res.status(200).json(review);
    } catch (err) {
        res.status(400).json(err);
    }
};

const deleteReview = async (req, res) => {
    try {
        const result = await reviewService.deleteReview(
            req.params.id,
            req.user._id
        );
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
};

export {
    createReview,
    getReviewsForItem,
    getReviewsForSeller,
    getUserReviews,
    updateReview,
    deleteReview
};