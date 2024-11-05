const express = require('express');
const { auth, isTokenBlacklisted, onlyOwner, onlyMember } = require('../middleware/auth');
const { getGroupAllMessages, getDummyMessages, sendDummyMessage } = require('../controllers/groupControllers');
const { createGroup, addMemberGroup, sendMessage } = require('../controllers/ChatGroups/postCalls');
const { isMemberAdded } = require('../middleware/Validations/groupValidations');

const router=express.Router();

router.get("/default", (req, res)=>{
    res.send("Group chat default endpoint");
});

//Post Calls

router.post("/createGroup", [auth, isTokenBlacklisted], createGroup);
router.post("/addMember", [auth, isTokenBlacklisted, onlyOwner], addMemberGroup);
router.post("/sendMessage",[auth, isTokenBlacklisted, isMemberAdded] ,sendMessage);


// Get Calls

router.get("/allMessages", [auth, isTokenBlacklisted], getGroupAllMessages)


module.exports=router