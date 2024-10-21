const express = require('express');
const http= require('http');
const socketio= require('socket.io');
const cors=require('cors');
const mongoose=require('mongoose');
require('dotenv').config();

const PORT=process.env.PORT;
const app=express();
const server = http.createServer(app);
const io=socketio(server);


const userRouter=require('./routes/users.js')
const chatGroupRouter= require('./routes/chatGroup.js')


app.use(cors());
app.use(express.json());


app.use("/users", userRouter)
app.use("/group", chatGroupRouter)

app.get(process.env.SECRET_PATH, (req, res)=>{
    res.send(process.env.SECRET_MESSAGE);
})

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_CONNECTION_URL).then(()=>  app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})).catch((err)=>{
    console.error(`Error while starting and connecting DB ${err}`)
});

