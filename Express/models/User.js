const mongoose=require("mongoose")
const userSchema=new mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
        },
        password:{
            type:String,
            required:true,
        },
        name:{
            type:String,
        },
        role:{
            type:String,
            enum:["user","admin"],
            default:"user",
            required:false
        },
        phone:{
            type:String,
            required:false,
        }

    },
    {timestamps:true}
);

module.exports=mongoose.model("users",userSchema)