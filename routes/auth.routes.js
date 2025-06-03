const express=require('express');
const router=express.Router();
const{loginUser}=require("../controllers/auth.controller");
const {verifyJwt}=require("../middleware/verifyJwt");

router.post("/",loginUser);
router.get("/profile",verifyJwt,);

module.exports=router