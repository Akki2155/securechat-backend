const mongoose = require('mongoose');

const userSchema=mongoose.Schema({
    emailId:{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required: true,
    },
    groupMembered: [String],
    username:{
        first:{
            type: String,
            required: true,
        },
        middle:{
            type: String,
        },
        last:{
            type: String,
            required: true,
        }
    },
    phonenumber:{
        type: Number,
        unique:true,
        required:true
    }
   }, {
    strict: true,
    timeStamps:true
})


const UserSchema=mongoose.model('User', userSchema, "User");

module.exports=UserSchema;