const express=require("express");
const app=express();
const http=require("http");
const cors=require("cors");
const {Server}=require("socket.io")

  app.use(cors());
const server=http.createServer(app);
const io=new Server(server,{
    cors:{
        origin:"http://127.0.0.1:5173",
        methods:["GET","POST"],
    },
});

io.on("connection",(socket)=>{
    console.log("user connected:",socket.id);
    socket.on("send_message",(data)=>{
        /* console.log(data) */
        socket.to(data.room).emit("send_message",data)
    })
    socket.on("join_room",(data)=>{
        socket.join(data);
        console.log(`User Id :${socket.id} joined room:${data}`);
    });
    socket.on("disconnect",()=>{
        console.log("User disconnected:",socket.id);
    });
});


server.listen(3001,()=>{
    console.log("SERVER IS RUNING");
})