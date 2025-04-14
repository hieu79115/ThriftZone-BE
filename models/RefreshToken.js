import mongoose from "mongoose";

const RefreshTokenSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now,expires: 24 * 60 * 60*1000 },
  });
const RefreshToken = mongoose.model('RefreshToken', RefreshTokenSchema);
export default RefreshToken;
