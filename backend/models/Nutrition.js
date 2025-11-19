const mongoose = require("mongoose");

const NutritionSchema = new mongoose.Schema({
    username: String,
    meal: String,
    calories: Number
});

module.exports = mongoose.model("Nutrition", NutritionSchema);
