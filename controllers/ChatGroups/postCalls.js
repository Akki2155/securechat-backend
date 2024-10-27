const { getGroupDetails, isMemberAdded, isGroupOwner } = require("../../middleware/Validations/groupValidations.js");
const { getUserDetails } = require("../../middleware/Validations/userValidations.js");
const GroupModal=require("../../models/group.js")

const createGroup=async(req,res)=>{
    const {groupName, groupKey, userId}=req.body; 
    const result = await GroupModal.create({
        groupName,
        groupDecodekey: groupKey,
        owner:userId,
        members:[userId]
    })

    if(!result){
        return res.status(400).json({
            res:"Failed",
            message:"Couldn't create group!"
        }); 
    }else{
        return res.status(200).json({
            res:"Success",
            message:"Group created successfully!"
        }) 
    }
    

}

const addMemberGroup=async(req,res)=>{
    const {memberEmail, userId, groupId} =req.body;

    const requestedUser=await getUserDetails(memberEmail)

    if(!requestedUser){
        return res.status(400).json({
            res:"Failed",
            message:"Requested User Not found"
        })     
    };

    const requestedGroup=await getGroupDetails(groupId)

    if(!requestedGroup){
        return res.status(400).json({
            res:"Failed",
            message:"Requested Group Not found"
        })     
    }

    if(await isMemberAdded(groupId, memberEmail)){
        return res.status(400).json({
            res:"Failed",
            message:"Member Already present"
        })
    }

    requestedGroup.members.push(requestedUser.id)
    const result = await requestedGroup.save();

    if(!result){
        return res.status(500).json({
            res:"Failed",
            message:"Internal Server Error"
        })
    }

    return res.status(200).json({
        res:"Success",
        message:"User added as memeber"
    })
    

}

module.exports={
    createGroup,
    addMemberGroup
}