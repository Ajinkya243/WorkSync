const jwt=require("jsonwebtoken");
require('dotenv').config();
const jwt_key=process.env.jwt_key;
const verifyJwt=async(req,resp,next)=>{
        const authHeader=req.headers['authorization'];
        if(!authHeader){
            return resp.status(401).json({ message: "Access denied. No token provided." });
        }
        const token=authHeader.split(" ")[1];
        try{
            const decode=jwt.verify(token,jwt_key);
            req.user=decode;
            next();
        }
    catch(error){
        resp.status(403).json({"message":"Invalid or expired token."})
    }
}
module.exports={verifyJwt}