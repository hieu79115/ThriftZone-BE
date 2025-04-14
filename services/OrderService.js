import User from "../models/User.js";
import Order from "../models/Order.js";
import Address from "../models/Address.js";
import Payment from "../models/Payment.js";
import isAuthorized from "./AuthorizationService.js";
import Item from "../models/Item.js";
class OrderService{
    async createOrder(buyerId,shippingAddressId,billingAddressId,itemId,paymentId){
        const buyer= await User.findById(buyerId);
        if(!buyer){
            throw new Error("Buyer not found!");
        }
        const shippingAddress=await Address.findById(shippingAddressId);
        if(!shippingAddress){
            throw new Error("shipping address not found!");
        }
        const billingAddress= await Address.findById(billingAddressId);
        if(!billingAddress){
            throw new Error("billing address not found!");
        }
        const item=await Item.findById(itemId);
        if(!item){
            throw new Error("Item not found!");
        }
        const payment= await Payment.findById(paymentId);
        if(!payment){
            throw new Error("payment not found!");
        }

        const order= new Order({
            buyerId:buyerId,
            shippingAddress:shippingAddress,
            billingAddress:billingAddress,
            item:item,
            payment:payment,
            orderStatus:"PENDING",
            totalAmount:payment.amount,
        });
        await order.save();
        return order;
    }
    async processPaymentCallback(orderId,paymentResult){
        const order=Order.findById(orderId);
        if(!order){
            throw new Error("order not found!");
        }
        const payment=Payment.findById(paymentId);
        if(!payment){
            throw new Error("payment not found!");
        }

        if(paymentResult.status === "success"){
            if(this.validateOrderStatusTransition(order.orderStatus,'DELIVERING')){
                throw new Error("invalid order status");
            }
            const payment = new Payment({
                orderId:orderId,
                paymentMethod:paymentResult.paymentMethod,
                transactionId:paymentResult.transactionId,
                amount:paymentResult.amount,
            })
            await payment.save();
            order.payment=payment.id;
            await order.save();
        }else
        {
            throw new Error("payment failed!");
        }
        return order;
    }
    async shipOrder(orderId, trackingNumber)
    {
        const order=Order.findById(orderId);
        if(!order){
            throw new Error("order not found!");
        }
        if(!this.validateOrderStatusTransition(order.orderStatus,'FULFILLED')){
            throw new Error("invalid order status");
        }
        order.trackingNumber=trackingNumber;
        await order.save();
        return order;
    }
    async cancelOrder(orderId){
        const order=Order.findById(orderId);
        if(!order){
            throw new Error("order not found!");
        }
        order.orderStatus="REJECTED";
        await order.save();
        return order;
    }
    async getOrderForBuyer(orderId, userId)
    {
        const order= await Order.findById(orderId);
        if(!order){
            throw new Error("order not found!");
        }
        if(order.buyerId!==userId && !await isAuthorized(userId,true,true,'ORDER')){
            throw new Error("order not found!");
        }
        return order;
    }
    validateOrderStatusTransition(oldState,newState)
    {
        //    orderStatus:{type:String, Enum:['PENDING','DELIVERING','FULFILLED','REJECTED']},
        const validTransition ={
            ['PENDING']:['DELIVERING','FULFILLED','REJECTED'],
            ['DELIVERING']:['DELIVERING','FULFILLED','REJECTED'],
            ['FULFILLED']:['REJECTED'],
            ['REJECTED']:['REJECTED'],
        }
        return validTransition[oldState]?.includes(newState)||false;
    }



}
export default OrderService;