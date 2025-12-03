const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique: true,       //schema level validation
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const userModel = mongoose.model("user",userSchema);

module.exports = userModel;