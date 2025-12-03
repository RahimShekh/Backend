const express = require("express");
const app = express();
const authRoutes =  require("./routes/auth.routes");
const cookieParser = require("cookie-parser");
const postRoutes = require("./routes/post.routes");


app.use(express.json());
app.use("/api/auth",authRoutes);
app.use(cookieParser());
app.use("/api/posts",postRoutes);
module.exports = app;