const mongoose = require("mongoose");

const ExerciseSchema = new mongoose.Schema({
    username: String,
    exercise: String,
    duration: Number
});

module.exports = mongoose.model("Exercise", ExerciseSchema);
