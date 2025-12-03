const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.models");

//post /api/post [protected]
router.post("/",async (req,res)=>{
    const token = req.cookies.token;

    if(!token)
    {
        return res.status(401).json({
            message:"please login first,invalid access"
        })
    }

    try
    {
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    const user = await userModel.findOne({
        _id:decoded.id
    })

    req.user = user;   // user ka data req.user mein store kare

    }
    catch(err){
        return res.status(401).json({
            message:"invalid token,please login again"
        })
    }
})



module.exports = router;