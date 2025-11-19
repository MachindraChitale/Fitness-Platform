const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String,
    name: String,
    age: Number,
    weight: Number,
    height: Number
});

module.exports = mongoose.model("User", UserSchema);
