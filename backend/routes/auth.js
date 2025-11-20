const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Register
router.post("/register", async (req, res) => {
    try {
        const { username, password, name, age, weight, height } = req.body;
        console.log(`[AUTH] Registering user: ${username}`);
        const user = new User({ username, password, name, age, weight, height });
        await user.save();
        console.log(`[AUTH] User registered successfully: ${username}`);
        res.json({ message: "User registered successfully" });
    } catch (err) {
        console.error(`[AUTH] Register error - ${err.code || err.name}: ${err.message}`);
        const errorMsg = err.code === 11000 ? "Username already exists" : err.message;
        res.status(400).json({ error: errorMsg });
    }
});

// Login
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(`[AUTH] Login attempt: ${username}`);
        const user = await User.findOne({ username, password });
        if(user) {
            console.log(`[AUTH] Login successful: ${username}`);
            res.json({ message: "Login successful" });
        } else {
            console.log(`[AUTH] Login failed: invalid credentials for ${username}`);
            res.status(400).json({ error: "Invalid credentials" });
        }
    } catch (err) {
        console.error(`[AUTH] Login error: ${err.message}`);
        res.status(500).json({ error: "Login failed" });
    }
});

module.exports = router;
