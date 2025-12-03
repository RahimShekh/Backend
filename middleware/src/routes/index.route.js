const express = require("express");

const router = express.Router();

router.use((req,res,next)=>{
    console.log("this middleware is between router and api")
    next();
})
router.get("/",(req,res)=>{
    res.json({
        message: "welcome to cohort"
    })
})

module.exports = router;