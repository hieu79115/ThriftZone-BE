import express from "express";
import {
    createAddress,
    getAddresses,
    getAddress,
    updateAddress,
    deleteAddress
} from "../controllers/AddressController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// All routes are protected
router.use(authMiddleware);
router.post('/create', createAddress);
router.get('/all', getAddresses);
router.get('/:id', getAddress);
router.put('/:id', updateAddress);
router.delete('/:id', deleteAddress);

export default router;