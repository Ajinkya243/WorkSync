const express=require('express');
const router=express.Router();
const {addProject,getAllprojects,getProjectById}=require("../controllers/project.controller");

router.post("/",addProject);
router.get("/",getAllprojects);
router.get("/:id",getProjectById);

module.exports=router;