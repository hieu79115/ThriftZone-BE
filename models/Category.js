import mongoose from "mongoose";

const userSchema= mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    parentCategoryId:{
        type:mongoose.Schema.Types.ObjectId,
    }
},{timestamps:true});
const Category = mongoose.model("Category", userSchema);
export default Category;
