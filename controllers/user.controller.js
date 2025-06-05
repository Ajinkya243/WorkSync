const {User}=require("../models/User.models");
const {Assignment}=require("../models/Assignment.models");
const bcrypt=require("bcrypt");


const addUser=async(req,resp)=>{
    try{
        const{password,email}=req.body;
        const existingUser=await User.findOne({email});
        if(existingUser){
            return resp.status(400).json({message:"Email already register"})
        }
        const bcryptPassword=await bcrypt.hash(password,10);
        const user=new User({...req.body,password:bcryptPassword});
        await user.save();
        resp.status(201).json(user);
    }
    catch(error){
        resp.status(500).json({message:"Something went wrong"})
    }
}

const getUsers=async(req,resp)=>{
    try{
        const loggedUser=req.user;
        let users;
        if(loggedUser.role=="manager"){
            users=await User.find({role:'engineer'});
        }else{
            users=await User.find();
        }
        resp.status(200).json(users);
    }
    catch(error){
        resp.status(500).json({"message":"Something went wrong"})
    }
}

const getUserById=async(req,resp)=>{
    try{
        const engineerId=req.params.id;
        const user=await User.findById(engineerId);
        if(!user){
            return resp.status(404).json({"message":"User not found"})
        }
        const activeAssignment=await Assignment.find({engineerId,endDate:{$gte:new Date()}})
        const totalAllocated=activeAssignment.reduce((sum,cur)=>sum+=cur.allocationPercentage,0);
        const available=user.maxCapacity-totalAllocated;
        const obj=user.toObject();
        resp.send({...obj,availableCapacity:available});
    }
    catch(error){
        resp.status(500).json({"message":"Something went wrong"})
    }
}

const updateUser=async(req,resp)=>{
    try{
        const id=req.params.id
       const user=await User.findByIdAndUpdate(id,req.body,{new:true});
       if(!user){
        return resp.status(404).json({"message":"User not found"})
       }
       resp.status(200).json({"message":"User updated successfully",user});
    }
    catch(error){
        resp.status(500).json({"message":"Something went wrong"})
    }
}

const getEngineersBySkill = async (req, res) => {
  try {
    const { skill } = req.params;

    const engineers = await User.find({
      role: "engineer",
      skills: { $regex: new RegExp(skill, "i") }
    });

    if (engineers.length === 0) {
      return res.status(404).json({ message: "No engineers found with this skill" });
    }

    res.status(200).json(engineers);
  } catch (error) {
    console.error("Error fetching engineers by skill:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports={addUser,getUsers,getUserById,updateUser,getEngineersBySkill}