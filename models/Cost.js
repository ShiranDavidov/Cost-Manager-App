const mongoose = require("mongoose")

const costSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    category: String,
    description: String,
    sum: Number,
    currency: String,
    date: Date
})

module.exports = mongoose.model("Costs", costSchema)