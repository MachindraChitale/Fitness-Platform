const express = require("express");
const router = express.Router();
const Nutrition = require("../models/Nutrition");

// Add meal
router.post("/", async (req,res)=>{
    try {
        const { username, meal, calories } = req.body;
        console.log(`[NUTRITION] Adding meal for ${username}: ${meal}`);
        const n = new Nutrition({ username, meal, calories });
        await n.save();
        console.log(`[NUTRITION] Meal added for ${username}`);
        res.json({message:"Meal added"});
    } catch (err) {
        console.error(`[NUTRITION] Add error: ${err.message}`);
        res.status(500).json({error:"Failed to add meal"});
    }
});

// Get meals
router.get("/:username", async (req,res)=>{
    try {
        console.log(`[NUTRITION] Getting meals for: ${req.params.username}`);
        const meals = await Nutrition.find({username:req.params.username});
        console.log(`[NUTRITION] Found ${meals.length} meals for ${req.params.username}`);
        res.json(meals);
    } catch (err) {
        console.error(`[NUTRITION] Get error: ${err.message}`);
        res.status(500).json({error:"Failed to fetch meals"});
    }
});

// Delete meal
router.delete("/:username/:index", async (req,res)=>{
    try {
        console.log(`[NUTRITION] Deleting meal ${req.params.index} for ${req.params.username}`);
        const meals = await Nutrition.find({username:req.params.username});
        if(meals[req.params.index]){
            await meals[req.params.index].deleteOne();
            console.log(`[NUTRITION] Meal deleted for ${req.params.username}`);
            res.json({message:"Meal deleted"});
        } else {
            console.log(`[NUTRITION] Meal not found at index ${req.params.index}`);
            res.status(404).json({error:"Not found"});
        }
    } catch (err) {
        console.error(`[NUTRITION] Delete error: ${err.message}`);
        res.status(500).json({error:"Failed to delete meal"});
    }
});

module.exports = router;
