const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Get profile
router.get("/:username", async (req,res)=>{
    const user = await User.findOne({username:req.params.username});
    if(user) res.json(user);
    else res.status(404).json({error:"User not found"});
});

// Update profile
router.put("/:username", async (req,res)=>{
    const { name, age, weight, height } = req.body;
    const user = await User.findOneAndUpdate(
        {username:req.params.username},
        { name, age, weight, height },
        { new:true }
    );
    if(user) res.json({message:"Profile updated"});
    else res.status(404).json({error:"User not found"});
});

module.exports = router;
