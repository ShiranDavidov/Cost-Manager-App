const mongoose = require("mongoose")

const totalSumSchema = mongoose.Schema({
    shekel: Number,
    dollar: Number,
    euro: Number
})

const categorySchema = mongoose.Schema({
    title: String,
    total_sum: totalSumSchema
})

module.exports = mongoose.model("Categories", categorySchema)