const express=require('express');
const router=express.Router();
const{addAssignment,getAllAssignments,getAssignmetById,updateAssignmentById}=require("../controllers/assignment.controller");

router.get("/",getAllAssignments);
router.post("/",addAssignment);
router.get("/:id",getAssignmetById);
router.post("/:id",updateAssignmentById);

module.exports=router