import express from "express";
import {
    createItem,
    getItem,
    updateItem,
    deleteItem,
    getAllItems,
    getSellerItems
} from "../controllers/ItemController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get('/all', getAllItems);
router.get('/:id', getItem);

router.use(authMiddleware);
router.post('/create', createItem);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);
router.get('/seller/items', getSellerItems);

export default router;