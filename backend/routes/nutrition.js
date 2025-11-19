const express = require("express");
const router = express.Router();
const Nutrition = require("../models/Nutrition");

// Add meal
router.post("/", async (req,res)=>{
    const { username, meal, calories } = req.body;
    const n = new Nutrition({ username, meal, calories });
    await n.save();
    res.json({message:"Meal added"});
});

// Get meals
router.get("/:username", async (req,res)=>{
    const meals = await Nutrition.find({username:req.params.username});
    res.json(meals);
});

// Delete meal
router.delete("/:username/:index", async (req,res)=>{
    const meals = await Nutrition.find({username:req.params.username});
    if(meals[req.params.index]){
        await meals[req.params.index].deleteOne();
        res.json({message:"Meal deleted"});
    } else res.status(404).json({error:"Not found"});
});

module.exports = router;
