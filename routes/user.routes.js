const express=require('express');
const router=express.Router();
const{addUser,getUserById,getUsers, updateUser, getEngineersBySkill}=require("../controllers/user.controller");
const {verifyJwt}=require("../middleware/verifyJwt");

router.post("/",addUser);
router.get("/",verifyJwt,getUsers);
router.get("/:id/capacity",getUserById);
router.post("/:id",updateUser);
router.get("/skills/:skill",getEngineersBySkill);

module.exports=router;