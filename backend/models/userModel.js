import mongoose  from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    cartData:{type:Object,default:{}}
},{minimize:false})

/* Here 2nd part is used to create model initially while 1st part is used to avoid recreation of model */
const userModel = mongoose.models.user || mongoose.model("user",userSchema);
export default userModel;