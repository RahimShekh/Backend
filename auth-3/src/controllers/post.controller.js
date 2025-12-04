const postModel = require("../models/post.model");
const generateCaption = require("../service/ai.service");
const uploadFile = require("../service/storage.service");
const {v4:uuidv4} = require("uuid");

async function createPostController(req,res)
{
    const file = req.file;
    console.log("file received",file);

    const based64Image = new Buffer.from(file.buffer).toString("base64"); //convert buffer data into base64
    // console.log(based64Image);
    const caption = await generateCaption(based64Image);
    const result = await uploadFile(file.buffer,`${uuidv4()}`)
    const post = await postModel.create({
        caption:caption,
        image:result.url,
        user:req.user._id
    })

    res.status(201).json({
        message:"post created Successfully",
        post
    })
    // console.log("genrated catption:",caption)
    // res.json({
    //     caption,
    //     result
    // })
}

module.exports = {
    createPostController
}