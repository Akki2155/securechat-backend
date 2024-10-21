const jwt= require('jsonwebtoken');
const BlackListedTokenSchema = require('../models/blackListedToken');

const auth=async(req, res, next)=>{
    try {

        const token= req.headers.authorization;
        const isCustomToken=token.length < 500 ;
        let decodedData;

        if(token && isCustomToken){
            decodedData= jwt.decode(token, process.env.JWTPASSKEY);
            if(!new Date((decodedData?.exp)*1000) > new Date()){
                return res.status(400).json({
                    status:"Failed",
                    message:"User Logged out"
                })
            }  
            req.body.userId=decodedData?.id;
        }else{
            decodedData=jwt.decode(token);
            req.body.userid=decodedData?.sub;
        }
    
        next();

    } catch (error) {
        console.log(error);
    }
}

const isTokenBlacklisted=async(req,res,next)=>{

    try {
        const token= req.headers.authorization;
    
        const isTokenBlacklisted=await BlackListedTokenSchema.findOne({
            blackListedToken: token
        })
    
       if(isTokenBlacklisted){
            return res.status(400).json({
                status:"Failed",
                message:"User Logged out"
            })
       }

       next();
        
    } catch (error) {
        console.log(error);
    }
}


module.exports={
    auth, 
    isTokenBlacklisted
};