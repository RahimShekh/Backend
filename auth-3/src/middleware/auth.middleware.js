const userModel = require("../models/user.models");
const jwt = require("jsonwebtoken");

async function authMiddleware (req,res,next)
{
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

        req.user = user;   // user ka data req.user mein store kare ye data createpost ki taraf bhejta
        next();
    }
    catch(err){
        return res.status(401).json({
            message:"invalid token,please login again"
        })
    }
}

module.exports = authMiddleware;