const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Get profile
router.get("/:username", async (req,res)=>{
    try {
        console.log(`[PROFILE] Getting profile for: ${req.params.username}`);
        const user = await User.findOne({username:req.params.username});
        if(user) {
            console.log(`[PROFILE] Found profile: ${req.params.username}`);
            res.json(user);
        } else {
            console.log(`[PROFILE] User not found: ${req.params.username}`);
            res.status(404).json({error:"User not found"});
        }
    } catch (err) {
        console.error(`[PROFILE] Get error: ${err.message}`);
        res.status(500).json({error:"Failed to fetch profile"});
    }
});

// Update profile
router.put("/:username", async (req,res)=>{
    try {
        const { name, age, weight, height } = req.body;
        console.log(`[PROFILE] Updating profile for: ${req.params.username}`);
        const user = await User.findOneAndUpdate(
            {username:req.params.username},
            { name, age, weight, height },
            { new:true }
        );
        if(user) {
            console.log(`[PROFILE] Profile updated: ${req.params.username}`);
            res.json({message:"Profile updated"});
        } else {
            console.log(`[PROFILE] User not found for update: ${req.params.username}`);
            res.status(404).json({error:"User not found"});
        }
    } catch (err) {
        console.error(`[PROFILE] Update error: ${err.message}`);
        res.status(500).json({error:"Failed to update profile"});
    }
});

module.exports = router;
