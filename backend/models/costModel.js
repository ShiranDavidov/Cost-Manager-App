const mongoose = require("mongoose")

const costSchema = mongoose.Schema({
    userId: String,
    category: String,
    sum: Number,
    description: String,
    date: Date
})

module.exports = mongoose.model("Costs", costSchema)