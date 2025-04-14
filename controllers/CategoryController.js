import CategoryService from '../services/CategoryService.js';
const categoryService = new CategoryService();

const createCategory = async (req, res) => {
    try {
        const category = await categoryService.createCategory(req.body);
        res.status(201).json(category);
    } catch (err) {
        res.status(400).json(err);
    }
};

const getCategory = async (req, res) => {
    try {
        const category = await categoryService.getCategoryById(req.params.id);
        res.status(200).json(category);
    } catch (err) {
        res.status(400).json(err);
    }
};

const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.status(200).json(categories);
    } catch (err) {
        res.status(400).json(err);
    }
};

const updateCategory = async (req, res) => {
    try {
        const category = await categoryService.updateCategory(
            req.params.id,
            req.body
        );
        res.status(200).json(category);
    } catch (err) {
        res.status(400).json(err);
    }
};

const deleteCategory = async (req, res) => {
    try {
        const result = await categoryService.deleteCategory(req.params.id);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
};

export {
    createCategory,
    getCategory,
    getAllCategories,
    updateCategory,
    deleteCategory
};