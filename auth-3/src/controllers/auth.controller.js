const userModel = require("../models/user.models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")

async function registerController(req,res)
{
    const {username,password} = req.body;

    const userExists = await userModel.findOne({username});

    if(userExists)
    {
        return res.status(409).json({
            message:"user name already exists"
        })
    }

    const user = await userModel.create({
        username,
        password: await bcrypt.hash(password,10)
    })
    
    const token = jwt.sign({
        id:user._id
    },process.env.JWT_SECRET);

    res.cookie("token",token);
    
    res.status(201).json({
        message:"user created successfully",
        user
    })
}

async function loginController(req,res)
{
    const {username, password}  =req.body;

    const user = await userModel.findOne({
        username
    })

    if(!user)
    {
        return res.status(400).json({message:"user not found"});
    }

    const isPassValid = await bcrypt.compare(password,user.password);
    // const isPassValid = user.password === password;
    

    if(!isPassValid)
    {
        return res.status(400).json({message:"invalid password"});
    }

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET);

    res.cookie("token",token);

    res.status(200).json({
        message:"user logged in succesfully",
        user:{
            username:user.username,
            id:user._id
        }
    })
}



module.exports = {
    registerController,
    loginController
}