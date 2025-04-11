import ItemService from '../services/ItemService.js';
const itemService = new ItemService();

const createItem = async (req, res) => {
    try {
        const item = await itemService.createItem({
            ...req.body,
            sellerId: req.user._id
        });
        res.status(201).json(item);
    } catch (err) {
        res.status(400).json(err);
    }
};

const getItem = async (req, res) => {
    try {
        const item = await itemService.getItemById(req.params.id);
        res.status(200).json(item);
    } catch (err) {
        res.status(400).json(err);
    }
};

const updateItem = async (req, res) => {
    try {
        const item = await itemService.updateItem(
            req.params.id,
            req.body,
            req.user._id
        );
        res.status(200).json(item);
    } catch (err) {
        res.status(400).json(err);
    }
};

const deleteItem = async (req, res) => {
    try {
        const result = await itemService.deleteItem(
            req.params.id,
            req.user._id
        );
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
};

const getAllItems = async (req, res) => {
    try {
        const items = await itemService.getAllItems(req.query);
        res.status(200).json(items);
    } catch (err) {
        res.status(400).json(err);
    }
};

const getSellerItems = async (req, res) => {
    try {
        const items = await itemService.getItemsBySeller(req.user._id);
        res.status(200).json(items);
    } catch (err) {
        res.status(400).json(err);
    }
};

export {
    createItem,
    getItem,
    updateItem,
    deleteItem,
    getAllItems,
    getSellerItems
};