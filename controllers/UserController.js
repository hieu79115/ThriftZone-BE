import UserService from '../services/UserService.js';
const userService = new UserService();

const getUser = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json(err);
    }
};

const getCurrentUser = async (req, res) => {
    try {
        const user = await userService.getUserById(req.user._id);
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json(err);
    }
};

const updateUser = async (req, res) => {
    try {
        const user = await userService.updateUser(
            req.user._id,
            req.body
        );
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json(err);
    }
};

const deleteUser = async (req, res) => {
    try {
        const result = await userService.deleteUser(req.user._id);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
};

export {
    getUser,
    getCurrentUser,
    updateUser,
    deleteUser
};