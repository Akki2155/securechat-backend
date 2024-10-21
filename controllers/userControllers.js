const UserModel=require('../models/users.js');
const bcrypt=require('bcrypt')
const jwt=require("jsonwebtoken")



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
            res.status(500).json({
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

const userlogin=async (req, res)=>{
    const {emailId, password}=req.body;

    const existingUser = await UserModel.findOne({emailId});

    if(!existingUser){
        return res.status(500).json({
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
    }, process.env.JWTPASSKEY,  { expiresIn: "1h" })

    return res.status(200).json({
        res:"Success",
        token,
        message:"User Logged In Succesfully!"
    })
    

}


module.exports={
    createUser,
    userlogin
}