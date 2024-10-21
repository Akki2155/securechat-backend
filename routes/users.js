const express=require('express');
const { createUser, userlogin } = require('../controllers/userControllers');


const router=express.Router();


router.get("/default", (req, res)=>{
    res.send("User default Endpoint")
})

router.post("/createuser", createUser)
router.get("/login", userlogin)


module.exports=router;