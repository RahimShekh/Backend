const express = require("express");
const router = express.Router();
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

//register
router.post("/register",async(req,res)=>{
    const {username,password} = req.body;
    const user = await userModel.create({
        username,password
    })

    const token = jwt.sign({
        id:user._id,   //mongoDB id
    },process.env.JWT_SECRET)

    res.cookie("token",token);

    res.status(201).json({
        message:"user registered succesfully",
        user,
         
    })
})

router.post("/login",async(req,res)=>{
    const {username,password} = req.body;

    const user = await userModel.findOne({
        username:username
    })

    if(!user)
    {
        return res.status(401).json({
            message:"user not found[invalid username]"
        })
    }
    const isPasswordValid = password == user.password;

    if(!isPasswordValid)
    {
        return res.status(401).json({
            message:"invalid passwod"
        })
    }

    res.status(200).json({
        message:"user loggd in"
    })
})

router.get("/user",async(req,res)=>{
    const {token} = req.cookies;
    if(!token)
    {
        return res.status(401).json({
            message:"unauthorized[no token]"
        })
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        // res.send(decoded);
        const user = await userModel.findOne({
            _id:decoded.id
        }).select("-password -__v").lean();  // pasword nhi aayhea db se

        res.status(200).json({
            message:"user data fetch succesfully",
            user
        })
    }
    catch(err){
        return res.status(401).json({
            message:"invalid token"
        })
    }
})

module.exports = router;