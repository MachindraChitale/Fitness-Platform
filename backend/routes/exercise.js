const express = require("express");
const router = express.Router();
const Exercise = require("../models/Exercise");

// Add exercise
router.post("/", async (req,res)=>{
    try {
        const { username, exercise, duration } = req.body;
        console.log(`[EXERCISE] Adding exercise for ${username}: ${exercise}`);
        const ex = new Exercise({ username, exercise, duration });
        await ex.save();
        console.log(`[EXERCISE] Exercise added for ${username}`);
        res.json({message:"Exercise added"});
    } catch (err) {
        console.error(`[EXERCISE] Add error: ${err.message}`);
        res.status(500).json({error:"Failed to add exercise"});
    }
});

// Get exercises
router.get("/:username", async (req,res)=>{
    try {
        console.log(`[EXERCISE] Getting exercises for: ${req.params.username}`);
        const exercises = await Exercise.find({username:req.params.username});
        console.log(`[EXERCISE] Found ${exercises.length} exercises for ${req.params.username}`);
        res.json(exercises);
    } catch (err) {
        console.error(`[EXERCISE] Get error: ${err.message}`);
        res.status(500).json({error:"Failed to fetch exercises"});
    }
});

// Delete exercise
router.delete("/:username/:index", async (req,res)=>{
    try {
        console.log(`[EXERCISE] Deleting exercise ${req.params.index} for ${req.params.username}`);
        const exercises = await Exercise.find({username:req.params.username});
        if(exercises[req.params.index]){
            await exercises[req.params.index].deleteOne();
            console.log(`[EXERCISE] Exercise deleted for ${req.params.username}`);
            res.json({message:"Exercise deleted"});
        }else {
            console.log(`[EXERCISE] Exercise not found at index ${req.params.index}`);
            res.status(404).json({error:"Not found"});
        }
    } catch (err) {
        console.error(`[EXERCISE] Delete error: ${err.message}`);
        res.status(500).json({error:"Failed to delete exercise"});
    }
});

module.exports = router;
