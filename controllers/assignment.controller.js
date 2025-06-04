const {Assignment}= require("../models/Assignment.models");
const { User } = require("../models/User.models");

const addAssignment=async(req,resp)=>{
    try{
        const{engineerId,allocationPercentage}=req.body;

        const user=await User.findById(engineerId);
        if(!user){
            return resp.status(404).json({"message":"User not found"})
        }
        const activeAssignment=await Assignment.find({engineerId,endDate:{$gte:new Date()}});
        const totalAllocated=activeAssignment.reduce((sum,cur)=>sum+=cur.allocationPercentage,0);
        const available=user.maxCapacity-totalAllocated;
        if(available<allocationPercentage){
            return resp.status(400).json({"message":`Engineer only have ${available}% capacity available`});
        }
        const assignment=new Assignment(req.body);
        await assignment.save();
        const updatedAvailable=available-allocationPercentage;
        await User.findByIdAndUpdate(engineerId,{availableCapacity:updatedAvailable},{new:true})
        resp.status(201).json(assignment)
    }
    catch(error){
        resp.status(500).json({"message":"Something went wrong"})
    }
}

const getAllAssignments=async(req,resp)=>{
    try{
        const assignments=await Assignment.find().populate("engineerId").populate("projectId");
        resp.status(200).json(assignments);
    }
    catch(error){
        resp.status(500).json({"message":"Something went wrong"})
    }
}

const getAssignmetById=async(req,resp)=>{
    try{
        const assignment=await Assignment.findById(req.params.id).populate("engineerId");
        if(!assignment){
           return  resp.status(404).json({"message":"Assignment not found"})
        }
        resp.send(assignment);
    }
    catch(error){
        resp.status(500).json({"message":"Something went wrong"})
    }
}

const getAssignmetByProjectId=async(req,resp)=>{
    try{
        const assignment=await Assignment.find({projectId:req.params.id}).populate("engineerId").populate("projectId");
        if(!assignment){
           return  resp.status(404).json({"message":"Assignment not found"})
        }
        resp.send(assignment);
    }
    catch(error){
         resp.status(500).json({"message":"Something went wrong"})
    }
}

const updateAssignmentById=async(req,resp)=>{
    try{
        const assignmentId=req.params.id;
        const{engineerId,allocationPercentage}=req.body;

        const user=await User.findById(engineerId);
        if(!user){
            return resp.status(404).json({"message":"Engineer not found"});
        }
        const activeAssignments = await Assignment.find({engineerId,_id: { $ne: assignmentId },endDate: { $gte: new Date() }});
        const totalAllocatedExcludingCurrent=activeAssignments.reduce((sum,cur)=>sum+=cur.allocationPercentage,0);
        const available=user.maxCapacity-totalAllocatedExcludingCurrent
        if(available<allocationPercentage){
            return resp.status(400).json({"message":`Engineer only ${available}% capacity available`})
        }
        const assignment=await Assignment.findByIdAndUpdate(assignmentId,req.body,{new:true});
        const updatedAvailable=user.maxCapacity-(totalAllocatedExcludingCurrent+allocationPercentage);
        await User.findByIdAndUpdate(engineerId,{availableCapacity:updatedAvailable})
        resp.status(200).json({assignment});
    }
    catch(error){
        resp.status(500).json({"message":"Something went wrong"})
    }
}

const deleteAssignmentById=async(req,resp)=>{
    try{
        const assignmentId=req.params.id;
        const assignment=await Assignment.findById(assignmentId);
        if(!assignment){
            return resp.status(404).json({"message":"Assignment not found"})
        }
        const{engineerId,allocationPercentage}=assignment;
        const user=await User.findById(engineerId);
        if(!user){
            return resp.status(404).json({"message":"Engineer not found"})
        }
        const deleteAssignment=await Assignment.findByIdAndDelete(assignmentId);
        if(!deleteAssignment){
            return resp.status(404).json({"message":"Assignment not found"})
        }
        const available=user.availableCapacity+allocationPercentage;
        await User.findByIdAndUpdate(engineerId,{availableCapacity:available},{new:true})
        resp.status(200).json({"message":"Assignment deleted successfully"})
    }
    catch(error){
        resp.status(500).json({"message":"Something went wrong"})
    }
}

module.exports={addAssignment,getAllAssignments,getAssignmetById,updateAssignmentById,deleteAssignmentById,getAssignmetByProjectId}