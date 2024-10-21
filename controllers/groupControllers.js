const GroupModal=require("../models/group.js")
const MessageModal= require("../models/message.js")
const UserModel=require('../models/users.js');



const getGroupAllMessages=async(req, res)=>{
    const {groupId, userId, }=req.body;


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

const createGroup=async(req,res)=>{
    const {groupName, groupKey}=req.body;
    const userid= req.userid;

    console.log(userid);
    
 
    const result = await GroupModal.create({
        groupName,
        groupDecodekey: groupKey,
        owner:userid,
        members:[userid]
    })
    console.log(result)

    if(result.id){
        const user= await UserModel.findOne({id: userid})

        user.groupMembered.push(result.id);

        const updatedUser= await user.save();
        console.log(updatedUser)

    }

    
}




module.exports={
    getGroupAllMessages,
    decryptGroupAllMessages,
    decryptGroupMessage,
    getUserAllGroups,
    createGroup
}