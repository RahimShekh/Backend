const express = require("express");
const app = express();
const connectToDB = require("./src/db/db");
const noteModel = require("./src/models/note.model")
//server db se connect server.js file me

connectToDB();
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("hello world");
})

app.post("/notes",async(req,res)=>{
    const {title,content} = req.body;
    console.log(title,content);
    
    await noteModel.create({
        title,content
    })

    res.json({
        message:"note created succesfully"
    })
})

app.get("/notes",async(req,res)=>{
    const notes = await noteModel.find();

    res.json({
        message:"notes fetch succesfully",
        notes
    })
})

app.delete("/notes/:id",async(req,res)=>{
    const noteId = req.params.id;
    await noteModel.findOneAndDelete({
        _id: noteId
    })

    res.json({
        message:"note deleted"
    })
})

app.patch("/notes/:id",async(req,res)=>{
    const noteId = req.params.id;
    const {title} = req.body;

    await noteModel.findOneAndUpdate({
        _id:noteId
    },{
        title:title
    })
    res.json({
        message:"Note updated "
    })
})
app.listen(3000,()=>{
    console.log("Server started on port 3000...")
})