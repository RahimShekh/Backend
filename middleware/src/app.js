const express = require("express");
const indexRoutes = require("./routes/index.route")
const app = express();

app.use((req,res,next)=>{
    console.log("this is a middleware between app & router");
    next();
})
app.use("/",indexRoutes);

module.exports = app;