const express=require('express');
const router=express.Router();
const{addUser,getUserById,getUsers, updateUser}=require("../controllers/user.controller");
const {verifyJwt}=require("../middleware/verifyJwt");

router.post("/",addUser);
router.get("/",verifyJwt,getUsers);
router.get("/:id/capacity",getUserById);
router.post("/:id",updateUser);

module.exports=router;