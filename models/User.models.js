const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['engineer','manager'],
        default:'engineer'
    },
    skills:{
        type:[String],
        required:true
    },
    seniority:{
        type:String,
        enum:['junior','mid','senior'],
        default:'junior'
    },
    maxCapacity:{
        type:Number,
        enum:[100,50],
        required:true
    },
    availableCapacity:{
        type:Number,
        default:100
    },
    department:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const User=new mongoose.model("User",userSchema);
module.exports={User}