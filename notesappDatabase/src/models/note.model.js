const mongoose = require("mongoose");


const noteSchema = new mongoose.Schema({
    title : String,
    content : String
})

const noteModel = mongoose.model("note",noteSchema); // note is collection in db

module.exports = noteModel;