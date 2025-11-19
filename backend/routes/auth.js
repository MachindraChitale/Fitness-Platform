const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Register
router.post("/register", async (req, res) => {
    try {
        const { username, password, name, age, weight, height } = req.body;
        const user = new User({ username, password, name, age, weight, height });
        await user.save();
        res.json({ message: "User registered successfully" });
    } catch (err) {
        res.status(400).json({ error: "Username already exists" });
    }
});

// Login
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if(user) res.json({ message: "Login successful" });
    else res.status(400).json({ error: "Invalid credentials" });
});

module.exports = router;
