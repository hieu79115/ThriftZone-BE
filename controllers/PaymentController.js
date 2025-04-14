import PaymentService from '../services/PaymentService.js';
const paymentService = new PaymentService();

const createPaymentIntent = async (req, res) => {
    try {
        const paymentIntent = await paymentService.createPaymentIntent(
            req.body.itemId,
            req.user._id
        );
        res.status(201).json(paymentIntent);
    } catch (err) {
        res.status(400).json(err);
    }
};

const verifyPayment = async (req, res) => {
    try {
        const result = await paymentService.verifyPayment(
            req.body.paymentId,
            req.body.orderId
        );
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
};

const getPaymentMethods = async (req, res) => {
    try {
        const methods = await paymentService.getPaymentMethods(req.user._id);
        res.status(200).json(methods);
    } catch (err) {
        res.status(400).json(err);
    }
};

const addPaymentMethod = async (req, res) => {
    try {
        const method = await paymentService.addPaymentMethod(
            req.user._id,
            req.body
        );
        res.status(201).json(method);
    } catch (err) {
        res.status(400).json(err);
    }
};

const removePaymentMethod = async (req, res) => {
    try {
        const result = await paymentService.removePaymentMethod(
            req.user._id,
            req.params.methodId
        );
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
};

export {
    createPaymentIntent,
    verifyPayment,
    getPaymentMethods,
    addPaymentMethod,
    removePaymentMethod
};