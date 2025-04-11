import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    buyerId:{type:String, required: true},
    shippingAddress:{type:String, required: true},
    billingAddress:{type:String, required: true},
    orderDate:{type:Date, default:Date.now},
    totalAmount:{type:Number, default:0},
    orderStatus:{type:String, Enum:['PENDING','FULFILLED','REJECTED']},
})
const Order = mongoose.model("Order",OrderSchema);
export default Order;