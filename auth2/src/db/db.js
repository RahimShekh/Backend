const mongoose  = require("mongoose");


function connectDB(){
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log("mongoDB connected successfully");
    })
    .catch((error)=>{
        console.error(" DB connection failed",error);
    })
}

module.exports = connectDB;