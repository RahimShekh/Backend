const app = require("./src/app");
const { createServer } = require("http");
const { Server } = require("socket.io");
require("dotenv").config();
const generateResponse = require("./src/service/ai.service");

const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

const chatHistory = [
    
]

io.on("connection", (socket) => {
    console.log("user connected");

    socket.on("disconnect",()=>{
        console.log("user is disconnected");
    })

    // socket.on("message",(data)=>{
    //     console.log("message received")
    //     console.log(data);
    // })

    socket.on("ai-message",async(data)=>{   //listener
        console.log("received AI message",data.prompt);
        chatHistory.push({
            role:"user",
            parts:[{
                text:data
            }]
        })
        // const response = await generateResponse(data.prompt);
        const response = await generateResponse(chatHistory);
        // console.log("Ai Response",response);

        chatHistory.push({
            role:"model",
            parts:[{
                text: response
            }]
        })

        socket.emit("ai-message-response",{response})
    })
});

httpServer.listen(3000,()=>{
    console.log("server is running on 3000");
})

