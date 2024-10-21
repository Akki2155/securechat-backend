const UserModel=require('../models/users.js');
const BlackListedTokenSchema= require("../models/blackListedToken.js");
const bcrypt=require('bcrypt');
const jwt=require("jsonwebtoken");



const createUser=async(req, res)=>{
    try {
        
        const {emailId, username, password, phonenumber}=req.body;
    
        const hashedPassword=await bcrypt.hash(password, 12);
    
        const result= await UserModel.create({
            username:{
                first:username?.first, 
                middle:username?.middle,
                last:username?.last
            },
            emailId,
            password:hashedPassword,
            phonenumber
        })
    
        if(!result){
            res.status(400).json({
                res:"Failed",
                message:"User not signed up"
            })
        }else{
                res.status(200).json({
                    res:"Success",
                    message:"User Signed up Successfully"
                })
        }
    } catch (error) {
        res.status(500).json({
            res:"failed",
            message:error
        })
    }

}

const deleteUser=async(req,res)=>{
    const {emailId}=req.body;

    const existingUser = await UserModel.findOne({emailId});

    if(!existingUser){
        return res.status(400).json({
            res:"Failed",
            message:"User Not Found"
        })
    }

    const dbRes= await UserModel.deleteOne( {emailId } );
   
    if(dbRes.acknowledged && dbRes.deletedCount>0){
        return res.status(200).json({
            res:"Success",
            message:"User Deleted Successfully"
        })

    }else{
        return res.status(500).json({
            res:"Failed",
            message:"Internal Server Error!"
        })
    }    

}

const userlogin=async (req, res)=>{
    const {emailId, password, isRemeberMeEnabled}=req.body;

    const existingUser = await UserModel.findOne({emailId});

    if(!existingUser){
        return res.status(400).json({
            res:"Failed",
            message:"User Not Found"
        })
    }

    const comparePassword=await bcrypt.compare(password, existingUser.password)

    if(!comparePassword){
        return res.status(400).json({
            res:"Failed",
            message:"That email id and password doesn't match !"
        })
    }

    const token=jwt.sign({
        emailId,
        phonenumber:existingUser.phonenumber,
        id:existingUser._id
    }, process.env.JWTPASSKEY,  { expiresIn: isRemeberMeEnabled ? "30d": "1h" })

    return res.status(200).json({
        res:"Success",
        token,
        message:"User Logged In Succesfully!"
    })
}

const userLogout=async(req,res)=>{

    try {
        const {token}=req.body;
        const dbRes=await BlackListedTokenSchema.create({
            blackListedToken: token
        })
        if(!dbRes){
            return res.status(200).json({
                result:dbRes
            })
        }else{
            return res.status(500).json({
                dbRes
            })
        }
        
    } catch (error) {

        // Chnage error message , for logout as token is already added to db
        return res.status(500).json({
            error
        })
    }
    

}

module.exports={
    createUser,
    userlogin,
    deleteUser,
    userLogout
}