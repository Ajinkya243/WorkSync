const mongoose=require('mongoose');

const projectSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
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
    requiredSkills:{
        type:[String],
        required:true
    },
    teamSize:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:['planning','active','completed'],
        default:"planning",
        required:true
    },
    managerId:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    }
},{timestamps:true})

const Project=new mongoose.model("Project",projectSchema);
module.exports={Project}