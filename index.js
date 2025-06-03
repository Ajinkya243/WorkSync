const {connectDB}=require("./config/db.connect");
const express=require('express');
const cors=require('cors');
const userRoutes=require("./routes/user.routes");
const projectRouter=require("./routes/project.routes");
const assignmentRouter=require("./routes/assignment.routes");
const authRouter=require("./routes/auth.routes");
require('dotenv').config();
const port=process.env.PORT;
const app=express();
app.use(cors())
app.use(express.json());

connectDB().then(()=>console.log('Database connected')).then(()=>{
    app.listen(port,async(req,resp)=>{
        console.log('Express running port',port)
    })
})

app.get("/",(req,resp)=>{
    resp.status(200).json({"message":"Welcome to WorkSync api"});
})
app.use("/api/engineers",userRoutes);
app.use("/api/projects",projectRouter);
app.use("/api/assignments",assignmentRouter);
app.use("/api/auth",authRouter);


