import express from "express";
import { login, logout, register, getCurrentUser, deleteUser } from "../controllers/authController.js";

const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Đăng ký người dùng mới
 *     description: Tạo tài khoản mới với tên người dùng và mật khẩu
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "john_doe"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       201:
 *         description: Đăng ký thành công
 */
router.post("/register", register);


/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Đăng nhập người dùng
 *     description: Đăng nhập với tên người dùng và mật khẩu
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "john_doe"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 */
router.post("/login", login);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Đăng xuất người dùng
 *     description: Đăng xuất khỏi tài khoản hiện tại
 *     tags:
 *       - Authentication
 *     responses:
 *       200:
 *         description: Đăng xuất thành công
 */
router.post("/logout", logout);

/**
 * @swagger
 * /api/auth/current-user:
 *   get:
 *     summary: Lấy thông tin người dùng hiện tại
 *     description: Lấy thông tin người dùng đã đăng nhập
 *     tags:
 *       - Authentication
 *     responses:
 *       200:
 *         description: Thông tin người dùng hiện tại
 */
router.get("/current-user", getCurrentUser);

/**
 * @swagger
 * /api/auth/delete-user/{id}:
 *   delete:
 *     summary: Xóa người dùng
 *     description: Xóa người dùng theo ID
 *     tags:
 *       - Authentication
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID của người dùng cần xóa
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Người dùng đã được xóa thành công
 *       404:
 *         description: Không tìm thấy người dùng với ID đã cho
 */
router.delete("/delete-user/:id", deleteUser);


export default router;
