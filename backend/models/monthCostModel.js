const mongoose = require("mongoose")

const monthCostSchema = mongoose.Schema({
    userId: String,
    category: String,
    month: String,
    year: String,
    sum: Number
})

module.exports = mongoose.model("MonthCost", monthCostSchema)