// const express = require("express");
// const app = express();

// app.get("/",(req,res)=>{
//     res.json({
//         message:"hello world"
//     })
// })

// module.exports = app;

const express = require("express");
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({ message: "hello world" });
});

module.exports = app;
