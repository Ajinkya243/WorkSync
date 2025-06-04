const express=require('express');
const router=express.Router();
const{addAssignment,getAllAssignments,getAssignmetById,updateAssignmentById, getAssignmetByProjectId}=require("../controllers/assignment.controller");

router.get("/",getAllAssignments);
router.post("/",addAssignment);
router.get("/:id",getAssignmetById);
router.post("/:id",updateAssignmentById);
router.get("/project/:id",getAssignmetByProjectId);

module.exports=router