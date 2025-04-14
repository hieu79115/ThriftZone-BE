import mongoose from "mongoose";

const PaymentSchema= new mongoose.Schema({
    orderId:{type:mongoose.Schema.Types.ObjectId, ref:"Order"},
    paymentMethod:{type:mongoose.Schema.Types.ObjectId, ref:"Payment"},
    transactionId:{type:String},
    amount:{type:Number,required:true},

},{ timestamps:true});
const Payment=mongoose.model("Payment",PaymentSchema);
export default Payment;