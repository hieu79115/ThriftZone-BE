import OrderService from '../Services/OrderService';
const orderService = new OrderService();
const createOrder= async (req,res)=>{
    try
    {
        const order= await orderService.createOrder(
            req.user._id,
            req.body.shippingAddressId,
            req.body.billingAddressId,
            req.body.itemId,
            req.body.paymentId,
        );
        res.status(201).json(order);
    }catch(err){
        res.status(400).json(err);
    }
}



export {
    createOrder
}