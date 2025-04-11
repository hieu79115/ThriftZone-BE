import express from "express";
import {
    createCategory,
    getCategory,
    getAllCategories,
    updateCategory,
    deleteCategory
} from "../controllers/CategoryController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";

const router = express.Router();


router.get('/all', getAllCategories);
router.get('/:id', getCategory);

router.use(authMiddleware);
router.use(adminMiddleware);
router.post('/create', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router;