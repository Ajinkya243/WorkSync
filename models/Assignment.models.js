const mongoose=require('mongoose');

const assignmentSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    engineerId:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    projectId:{
        type:mongoose.Schema.ObjectId,
        ref:"Project",
        required:true
    },
    allocationPercentage:{
        type:Number,
        min:0,
        max:100,
        required:true
    },
    startDate:{
        type:Date,
        required:true
    },
    endDate:{
        type:Date,
        required:true
    },
    role:{
        type:String,
        enum:["Development","Database","Cloud","Support","Analyst"]
    }
},{timestamps:true})

const Assignment=new mongoose.model("Assignment",assignmentSchema);
module.exports={Assignment}