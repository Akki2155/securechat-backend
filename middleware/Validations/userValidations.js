const UserModel=require("../../models/users.js");

const getUserDetails=async(userId)=>{
 
    const requestedUser = await UserModel.findOne({
        [userId.includes('@') ? 'emailId' : '_id']: userId
    });

    if(!requestedUser){
        return null;
    }else{
        return requestedUser;
    }
}


module.exports={
    getUserDetails
}