import Administrator from '../models/Administrator.js';

export const adminMiddleware = async (req, res, next) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: 'Authentication required' });
        }
        const admin = await Administrator.findOne({ userId: req.user._id });
        
        if (!admin) {
            return res.status(403).json({ message: 'Access denied. Admin privileges required' });
        }
        req.admin = admin;
        next();
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};