import express from "express";
import {
    getUser,
    getCurrentUser,
    updateUser,
    deleteUser
} from "../controllers/UserController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get('/profile/:id', getUser);

router.use(authMiddleware);
router.get('/profile', getCurrentUser);
router.put('/profile', updateUser);
router.delete('/account', deleteUser);

export default router;