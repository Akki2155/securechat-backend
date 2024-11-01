const express = require('express');
const { auth, isTokenBlacklisted, onlyOwner, onlyMember } = require('../middleware/auth');
const { getGroupAllMessages } = require('../controllers/groupControllers');
const { createGroup, addMemberGroup } = require('../controllers/ChatGroups/postCalls');

const router=express.Router();

router.get("/default", (req, res)=>{
    res.send("Group chat default endpoint");
});

//Post Calls

router.post("/createGroup", [auth, isTokenBlacklisted], createGroup);
router.post("/addMember", [auth, isTokenBlacklisted, onlyOwner], addMemberGroup)
router.post("/sendMessage/:id", [auth, isTokenBlacklisted, onlyMember], postMessage)

// Get Calls

router.get("/allMessages", [auth, isTokenBlacklisted], getGroupAllMessages)


module.exports=router