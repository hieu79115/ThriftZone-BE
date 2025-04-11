import mongoose from "mongoose";

const PrivilegeSchema = new mongoose.Schema({
    name:{type:String,required:true},
    object:{type:String,enum:['ADDRESS','CATEGORY','ITEM','ORDER','PAYMENT','REVIEW','USER'],required:true},
    allowRead:{type:Boolean,default:true},
    allowWrite:{ype:Boolean,default:true},
})
const Privilege = mongoose.model("Privilege",PrivilegeSchema);
export default Privilege;