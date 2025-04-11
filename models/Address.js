import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    streetAddress: {type: String, required: true},
    city: {type: String, required: true},
    stateProvince: {type: String, required: true},
    postalCode: {type: String, required: true},
    country:{type: String, required: true},
    addressType: {type: String, Enum:["Billing","Shipping"],  required: true},
    isDefault:{type: Boolean, default: false, required: true},
},{timestamps:true});
const Address = mongoose.model("Address", addressSchema);
export default Address;