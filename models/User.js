import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: [6, "Username must be at least 6 characters"],
        maxlength: [20, "Username must not exceed 20 characters"],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/.+\@.+\..+/, "Please enter a valid email address"],
    },
    passwordHash: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    profilePictureUrl:
        {
            type: String,
        },
    bio:
        {
            type: String,
            maxLength: [2000, "Bio must not exceed 2000 characters"],
        },
    isVerifiedSeller: {
        type: Boolean,
        required: true,
    },
},{timestamps:true});
const User = mongoose.model("User", userSchema);
export default User;
