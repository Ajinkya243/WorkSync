const {Project}=require("../models/Project.models");

const addProject=async(req,resp)=>{
    try{
        const project=new Project(req.body);
        await project.save();
        resp.status(201).json(project)
    }
    catch(error){
        resp.status(500).json({message:"Something went wrong","error":error.message});
    }
}

const getAllprojects=async(req,resp)=>{
    try{
        const {input}=req.query;
        if(!input){
        const projects=await Project.find().populate("managerId"); 
        resp.status(200).json(projects)
        }
        else{
            const projects=await Project.find({name:{$regex:input,$options:'i'}}).populate("managerId")
             resp.status(200).json(projects)
        }
    }
    catch(error){
        resp.status(500).json({message:"Something went wrong"})
    }
}

const getProjectById=async(req,resp)=>{
    try{
        const project=await Project.findById(req.params.id).populate("managerId");;
        if(!project){
           return  resp.status(404).json({message:"Project not found"})
        }
        resp.status(200).send(project);
    }
    catch(error){
        resp.status(500).json({message:"Something went wrong"})
    }
}

module.exports={addProject,getAllprojects,getProjectById};