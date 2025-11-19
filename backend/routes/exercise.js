const express = require("express");
const router = express.Router();
const Exercise = require("../models/Exercise");

// Add exercise
router.post("/", async (req,res)=>{
    const { username, exercise, duration } = req.body;
    const ex = new Exercise({ username, exercise, duration });
    await ex.save();
    res.json({message:"Exercise added"});
});

// Get exercises
router.get("/:username", async (req,res)=>{
    const exercises = await Exercise.find({username:req.params.username});
    res.json(exercises);
});

// Delete exercise
router.delete("/:username/:index", async (req,res)=>{
    const exercises = await Exercise.find({username:req.params.username});
    if(exercises[req.params.index]){
        await exercises[req.params.index].deleteOne();
        res.json({message:"Exercise deleted"});
    }else res.status(404).json({error:"Not found"});
});

module.exports = router;
