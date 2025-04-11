import Review from "../models/Review.js";

class ReviewService {
    async updateReview(reviewId, userId, rating, comment)
    {
        const review = await Review.findById(reviewId);
        if (!review) throw new Error("Review not found");
        if(review.reviewerId!==userId || !isAuthorized(userId, true,true,'REVIEW'))
        {
            throw new Error("Not authorized");
        }
        review.rating=rating;
        review.comment=comment;
        await review.save();
        return review;
    }

}