const mongoose = require("mongoose");
require("dotenv").config();

//server db se kaise connect hoga ye tum db.js
//file mein likhoge

function connectToDB()
{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("connected to DB");
    })
}

module.exports = connectToDB;