import UserService from '../services/UserService.js';
const userService = new UserService();

const getUser = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getCurrentUser = async (req, res) => {
    try {
        const user = await userService.getUserById(req.user._id);
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const user = await userService.updateUser(
            req.user._id,
            req.body
        );
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const result = await userService.deleteUser(req.user._id);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const register = async (req, res) => {
    try {
        const { email, username, password, firstName, lastName } = req.body;
        
        // Validation
        if (!email || !username || !password || !firstName || !lastName) {
            return res.status(400).json({ message: "All fields are required" });
        }
        
        const userData = await userService.register({
            email,
            username,
            password,
            firstName,
            lastName
        });
        
        res.status(201).json({
            message: "Registration successful",
            user: userData.user,
            accessToken: userData.accessToken,
            refreshToken: userData.refreshToken
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        
        if ((!email && !username) || !password) {
            return res.status(400).json({ message: "Email/username and password are required" });
        }
        const userData = await userService.login({ email, username, password });
        
        res.status(200).json({
            message: "Login successful",
            user: userData.user,
            accessToken: userData.accessToken,
            refreshToken: userData.refreshToken
        });
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
};

const logout = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        
        if (!refreshToken) {
            return res.status(400).json({ message: "Refresh token is required" });
        }
        
        const result = await userService.logout(refreshToken);
        
        if (result) {
            return res.status(200).json({ message: "Logout successful" });
        } else {
            return res.status(400).json({ message: "Invalid refresh token" });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        
        if (!refreshToken) {
            return res.status(400).json({ message: "Refresh token is required" });
        }
        
        const accessToken = await userService.refreshToken(refreshToken);
        
        return res.status(200).json({ accessToken });
    } catch (err) {
        return res.status(401).json({ message: err.message });
    }
};

export {
    getUser,
    getCurrentUser,
    updateUser,
    deleteUser,
    register,
    login,
    logout,
    refreshToken
};