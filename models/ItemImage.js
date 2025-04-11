import mongoose from "mongoose";

const ItemImageSchema = new mongoose.Schema({
    itemId:{type: mongoose.Schema.Types.ObjectId, ref: 'Item'},
    imageUrl:{type: String, required: true},
    isPrimary: {type: Boolean, default: false},
}, {timestamps:true});
const ItemImage= mongoose.model("ItemImage",ItemImageSchema)
export default ItemImage;

