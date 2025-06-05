const express=require('express');
const router=express.Router();
const{addAssignment,getAllAssignments,getAssignmetById,updateAssignmentById, getAssignmetByProjectId, getAssignmentByUserId, deleteAssignmentById}=require("../controllers/assignment.controller");

router.get("/",getAllAssignments);
router.post("/",addAssignment);
router.get("/:id",getAssignmetById);
router.post("/:id",updateAssignmentById);
router.delete("/:id",deleteAssignmentById);
router.get("/project/:id",getAssignmetByProjectId);
router.get("/user/:id",getAssignmentByUserId);

module.exports=router