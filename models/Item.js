import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
    sellerId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    categoryId: {type: mongoose.Schema.Types.ObjectId, ref: "Category"},
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    condition:{type: String, enum:["MINT","USED","UNSPECIFIED"], required: true},//Enum Item condition
    status: {type: String, enum: ["UNAVAILABLE","READY","SOLD"]},
    locationCity:{type: String, required: true},
    locationCountry:{type: String, required: true},

},{timestamps:true});
const Item = mongoose.model("Item", ItemSchema);
export default Item;
