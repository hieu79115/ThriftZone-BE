import User from "../models/User.js";
import {passwordHash, validatePassword} from "./encryption.js";
import Address from "../models/Address.js";
import Order from "../models/Order.js";
import Review from "../models/Review.js";
class UserService {
    async isUsedEmail(email){
        return await User.findOne({email:email})===true||false;
    }
    async isUsedUsername(userName){
        return await User.findOne({username: username})===true||false;
    }
    async register(userData){
        const {username, email, password, firstName, lastName}=userData;
        if(await User.findOne({email: email})) throw new Error("email is already registered");
        if(await User.findOne({username: username})) throw new Error("userName is already registered");
        const user= new User({
            username:username,
            password:passwordHash(password),
            email:email,
            firstName:firstName,
            lastName:lastName
        });
       await user.save();
        return user;
    }
    async login(identifier,password){
        //require username or email, then password
        if(identifier.email)
        {
            const user= await User.findOne({email:email});
            if(!user)
            {
                throw new Error(`User not found: ${identifier}`);
            }
            if(validatePassword(password,user.password)===true)
            {
                return user;
            }
            else
            {
                return false;
            }

        }
    }
    async updateProfile(userId,userData)
    {
        const user = await User.findById(userId);
        if(!user)
        {
            throw new Error(`User not found: ${userId}`);
        }
        Object.assign(user,userData);
        await user.save();
        return user;
    }
    async saveAddress(userId,addressData)
    {
        const user = await User.findById(userId);
        if(!user)
        {
            throw new Error(`User not found: ${userId}`);
        }
        const address = new Address(
            {
                userId: userId,
                ...addressData,
            }
        );
        await address.save();
        return address;
    }
    async verifySellerStatus(sellerId)
    {
        const user = await User.findById(sellerId);
        if(!user) throw new Error("User not found");
        user.isVerifiedSeller=true;
        await user.save();
        return user;
    }
    async leaveReview(userId, orderId, rating, comment)
    {
        const user = await User.findById(userId);
        if(!user) throw new Error("User not found");
        const order= await Order.findById(orderId);
        if(!order) throw new Error("Order not found");
        if(order.orderStatus!=='FULFILLED')
        {
            throw new Error("Order is not fulfilled, hence reviews are unavailable");
        }
        if(order.buyerId!==userId)
        {
            throw new Error("User does not own this order");
        }

        const review = new Review({
            orderId: orderId,
            reviewerId: userId,
            rating: rating,
            comment: comment,
        })
        await review.save();
        return review;
    }

}
export default UserService;