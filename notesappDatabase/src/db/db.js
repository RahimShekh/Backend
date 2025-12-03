const mongoose = require("mongoose");

//server db se kaise connect hoga ye tum db.js
//file mein likhoge

function connectToDB()
{
    mongoose.connect("mongodb+srv://rahimshekh46751:Rahim$k786@cluster0.nflbjmw.mongodb.net/notesapp")
    .then(()=>{
        console.log("connected to DB");
    })
}

module.exports = connectToDB;