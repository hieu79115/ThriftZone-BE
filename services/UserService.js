import User from "../models/User.js";
import bcrypt from "bcrypt"; // Replace custom encryption with standard bcrypt
import Address from "../models/Address.js";
import Order from "../models/Order.js";
import Review from "../models/Review.js";
import jwt from 'jsonwebtoken';
import RefreshToken from "../models/RefreshToken.js";

class UserService {
    async isUsedEmail(email){
        const user = await User.findOne({email: email});
        return user !== null;
    }
    
    async isUsedUsername(username){
        const user = await User.findOne({username: username});
        return user !== null;
    }
    
    async register(userData){
        try {
            const {username, email, password, firstName, lastName} = userData;
            
            // Check if email or username already exists
            if (await this.isUsedEmail(email)) {
                throw new Error("Email is already registered");
            }
            if (await this.isUsedUsername(username)) {
                throw new Error("Username is already registered");
            }
            
            // Hash password
            const passwordHash = await bcrypt.hash(password, 10);
            
            const user = await User.create({
                username,
                passwordHash,
                email,
                firstName,
                lastName,
                isVerified: false,
                isVerifiedSeller: false
            });
            
            const accessToken = this.generateAccessToken(user._id);
            const refreshToken = await this.generateRefreshToken(user._id);
            
            return {
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName
                },
                accessToken,
                refreshToken
            };
        } catch (error) {
            throw new Error(`Registration failed: ${error.message}`);
        }
    }
    
    async login(credentials) {
        try {
            const { email, username, password } = credentials;
            
            let user;
            if (email) {
                user = await User.findOne({email});
            } else if (username) {
                user = await User.findOne({username});
            } else {
                throw new Error("Email or username required");
            }
            
            if (!user) {
                throw new Error("Invalid credentials");
            }
            
            const isValidPassword = await bcrypt.compare(password, user.passwordHash);
            if (!isValidPassword) {
                throw new Error("Invalid credentials");
            }
            
            const accessToken = this.generateAccessToken(user._id);
            const refreshToken = await this.generateRefreshToken(user._id);
            
            return {
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    isVerifiedSeller: user.isVerifiedSeller
                },
                accessToken,
                refreshToken
            };
        } catch (error) {
            throw new Error(`Login failed: ${error.message}`);
        }
    }
    
    async logout(refreshToken){
        try {
            const result = await RefreshToken.findOneAndDelete({token: refreshToken});
            return result !== null;
        } catch (error) {
            throw new Error(`Logout failed: ${error.message}`);
        }
    }
    
    async refreshToken(token) {
        try {
            const tokenDoc = await RefreshToken.findOne({token: token});
            if (!tokenDoc) {
                throw new Error("Invalid refresh token");
            }
            
            let payload;
            try {
                payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
            } catch (error) {
                await RefreshToken.findOneAndDelete({token: token});
                throw new Error("Invalid or expired token");
            }
            
            const accessToken = this.generateAccessToken(payload.userId);
            return accessToken;
        } catch (error) {
            throw new Error(`Token refresh failed: ${error.message}`);
        }
    }
    
    async updateProfile(userId, userData) {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error(`User not found: ${userId}`);
        }
        
        const safeUpdate = {...userData};
        delete safeUpdate.passwordHash;
        delete safeUpdate.isVerifiedSeller;
        delete safeUpdate.email; 
        
        Object.assign(user, safeUpdate);
        await user.save();
        
        return {
            id: user._id,
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
        };
    }
    
    async saveAddress(userId, addressData) {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error(`User not found: ${userId}`);
        }
        
        const address = new Address({
            userId: userId,
            ...addressData,
        });
        
        await address.save();
        return address;
    }
    
    async verifySellerStatus(sellerId) {
        const user = await User.findById(sellerId);
        if (!user) throw new Error("User not found");
        
        user.isVerifiedSeller = true;
        await user.save();
        return user;
    }
    
    async leaveReview(userId, orderId, rating, comment) {
        const user = await User.findById(userId);
        if (!user) throw new Error("User not found");
        
        const order = await Order.findById(orderId);
        if (!order) throw new Error("Order not found");
        
        if (order.status !== 'DELIVERED') {
            throw new Error("Order must be delivered before leaving a review");
        }
        
        if (order.buyerId.toString() !== userId.toString()) {
            throw new Error("You can only review items you've purchased");
        }

        const review = new Review({
            orderId: orderId,
            reviewerId: userId,
            rating: rating,
            comment: comment,
        });
        
        await review.save();
        return review;
    }
    
    generateAccessToken(userId) {
        return jwt.sign(
            { userId },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' } 
        );
    }
    
    async generateRefreshToken(userId) {
        const token = jwt.sign(
            { userId },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '7d' } 
        );
        
        await RefreshToken.create({
            userId: userId,
            token: token,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        });
        
        return token;
    }
}
export default UserService;