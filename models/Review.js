import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
    orderId:{type:mongoose.Schema.Types.ObjectId, ref:"Order"},
    reviewerId:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    sellerId:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    rating:{type:Number,enum:[1,2,3,4,5]},
    comment:{type:String},

},{ timestamps:true});
const Review= mongoose.model("Review",ReviewSchema);
export default Review;