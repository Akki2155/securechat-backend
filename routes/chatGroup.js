const express = require('express');
const { auth } = require('../middleware/auth');
const { getGroupAllMessages, createGroup } = require('../controllers/groupControllers');

const router=express.Router();

router.get("/default", (req, res)=>{
    res.send("Group chat default endpoint");
});

router.get("/messages", auth, getGroupAllMessages)
router.post("/createGroup", auth, createGroup)

module.exports=router