import express from "express";
import {
    createItem,
    getItem,
    updateItem,
    deleteItem,
    getAllItems,
    getSellerItems
} from "../controllers/ItemController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/items/all:
 *   get:
 *     summary: Get all items
 *     description: Retrieve all available items with optional filtering
 *     tags:
 *       - Items
 *     parameters:
 *       - name: category
 *         in: query
 *         description: Filter by category ID
 *         schema:
 *           type: string
 *       - name: condition
 *         in: query
 *         description: Filter by condition (MINT, USED, UNSPECIFIED)
 *         schema:
 *           type: string
 *       - name: minPrice
 *         in: query
 *         description: Minimum price
 *         schema:
 *           type: number
 *       - name: maxPrice
 *         in: query
 *         description: Maximum price
 *         schema:
 *           type: number
 *       - name: sort
 *         in: query
 *         description: Sort order (price_asc, price_desc, date_asc, date_desc)
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of items
 */
router.get('/all', getAllItems);

/**
 * @swagger
 * /api/items/{id}:
 *   get:
 *     summary: Get item by ID
 *     description: Retrieve detailed information about a specific item
 *     tags:
 *       - Items
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Item ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item details
 *       404:
 *         description: Item not found
 */
router.get('/:id', getItem);

// Protected routes
router.use(authMiddleware);

/**
 * @swagger
 * /api/items/create:
 *   post:
 *     summary: Create new item
 *     description: Add a new item for sale
 *     tags:
 *       - Items
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               condition:
 *                 type: string
 *                 enum: [MINT, USED, UNSPECIFIED]
 *               categoryId:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Item created successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 */
router.post('/create', createItem);

/**
 * @swagger
 * /api/items/{id}:
 *   put:
 *     summary: Update item
 *     description: Update an existing item
 *     tags:
 *       - Items
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Item ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               condition:
 *                 type: string
 *                 enum: [MINT, USED, UNSPECIFIED]
 *               categoryId:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Item updated successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - not the item owner
 *       404:
 *         description: Item not found
 */
router.put('/:id', updateItem);

/**
 * @swagger
 * /api/items/{id}:
 *   delete:
 *     summary: Delete item
 *     description: Delete an existing item
 *     tags:
 *       - Items
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Item ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - not the item owner
 *       404:
 *         description: Item not found
 */
router.delete('/:id', deleteItem);

/**
 * @swagger
 * /api/items/seller/items:
 *   get:
 *     summary: Get seller's items
 *     description: Retrieve all items posted by the authenticated user
 *     tags:
 *       - Items
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of seller's items
 *       401:
 *         description: Unauthorized
 */
router.get('/seller/items', getSellerItems);

export default router;