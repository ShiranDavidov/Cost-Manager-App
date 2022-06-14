const mongoose = require("mongoose")

const occupationSchema = new mongoose.Schema({
  company: String,
  role: String
})

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  birthday: Date,
  marital_status: String,
  occupation: occupationSchema
})

module.exports = mongoose.model("Users", userSchema)