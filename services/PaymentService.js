// services/paymentService.js
const Payment = require('../models/Payment');
const Order = require('../models/Order');
const { PAYMENT_STATUSES } = require('../constants/enums');
// Assume Stripe integration
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

class PaymentService {
    // Initiate a payment
    async initiatePayment(orderId, amount, paymentMethod) {
        const order = await Order.findById(orderId);
        if (!order) throw new Error('Order not found');

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Convert to cents
            currency: 'usd',
            payment_method: paymentMethod,
            confirmation_method: 'manual',
            confirm: true,
        });

        const payment = new Payment({
            orderId,
            paymentMethod: 'card',
            transactionId: paymentIntent.id,
            amount,
            paymentStatus: PAYMENT_STATUSES.Pending,
        });
        await payment.save();

        return payment;
    }

    // Process payment callback
    async processPaymentCallback(orderId, paymentResult) {
        const payment = await Payment.findOne({ orderId });
        if (!payment) throw new Error('Payment not found');

        payment.paymentStatus = paymentResult.status === 'success'
            ? PAYMENT_STATUSES.Succeeded
            : PAYMENT_STATUSES.Failed;
        await payment.save();
        return payment;
    }

    // Process a refund
    async processRefund(orderId) {
        const order = await Order.findById(orderId);
        if (!order || order.orderStatus !== ORDER_STATUSES.Delivered) {
            throw new Error('Order not eligible for refund');
        }

        const payment = await Payment.findOne({ orderId });
        if (!payment || payment.paymentStatus !== PAYMENT_STATUSES.Succeeded) {
            throw new Error('No valid payment found');
        }

        await stripe.refunds.create({
            payment_intent: payment.transactionId,
        });

        payment.paymentStatus = PAYMENT_STATUSES.Refunded;
        order.orderStatus = ORDER_STATUSES.Refunded;
        await payment.save();
        await order.save();
        return payment;
    }
}

module.exports = new PaymentService();