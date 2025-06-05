const express=require('express');
const router=express.Router();
const{loginUser, getUserDetails}=require("../controllers/auth.controller");
const {verifyJwt}=require("../middleware/verifyJwt");

router.post("/",loginUser);
router.get("/profile",verifyJwt,getUserDetails);

module.exports=router