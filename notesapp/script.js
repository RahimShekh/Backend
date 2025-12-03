const express = require("express");
const app = express();


app.use(express.json());

const notes = [];

//get
app.get('/',function(req,res ){
    res.send("hello");
})

app.get("/notes",function(req,res){
    res.json(notes);
})
//post
app.post("/notes",(req,res)=>{
    console.log(req.body);
    notes.push(req.body);
    res.json({
        message:"notes created "
    });
})

//delete
app.delete('/notes/:index',(req,res)=>{
    const index = req.params.index;
    delete notes[index];
    res.json({
        message:"note deleted successfully"
    })
})

//patch to update

app.patch("/notes/:index",(req,res)=>{
    const index = req.params.index;
    const {title} = req.body;

    notes[index].title = title;

    res.json({
        message:"note updated"
    })
})


app.listen(3000,function(){
    console.log("server started...");
})