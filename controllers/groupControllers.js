const GroupModal=require("../models/group.js")
const MessageModal= require("../models/message.js")
const UserModel=require('../models/users.js');
const socket= require("../helpers/socket.js");


let messages=[{
    username:'h1T_HSaYeyQgaZ3cAAAD',
    message:'Check message 1'
},
]

const getGroupAllMessages=async(req, res)=>{
    const {groupId, userId, }=req.body;


    return res.status(200).json({
        groupId,
        userId
    })
    


}

const decryptGroupAllMessages=async(req,res)=>{
    const {groupId, userId, decodeKey}= req.body;


}

const decryptGroupMessage=async(req, res)=>{
    const {groupId, userId, decodeKey, messageId}=req.body;


}

const getUserAllGroups=async(req, res)=>{
    const {userId}=req.userId;
}


const getDummyMessages=async(req, res)=>{
    res.status(200).json({
        messages
    })
}

const sendDummyMessage=async(req, res)=>{
   messages.push(req.body);
   const io = socket.getIo();
   io.emit('message', req.body);

   res.status(201).json({
    messages
   })
}




module.exports={
    getGroupAllMessages,
    decryptGroupAllMessages,
    decryptGroupMessage,
    getUserAllGroups,
    getDummyMessages,
    sendDummyMessage
}