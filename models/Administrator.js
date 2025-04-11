import mongoose from "mongoose";

const AdministratorSchema = new mongoose.Schema({
    userId:{type:String,required: true},
    privileges:{type:Array,required: true},//type of Privilege id
},{ timestamps:true });
const Administrator = mongoose.model("Administrator",AdministratorSchema);
export default Administrator;
