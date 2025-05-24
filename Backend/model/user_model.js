import mongoose from "mongoose"

let userSchema = mongoose.Schema({
    fullname:{
       type:String,
       required:true
    },
    email:{
     type:String,
     required:true,
     unique:true
    },
    password:{
        type:String,
        required:true
    },
    
})
let user = mongoose.model("user", userSchema );
export default user