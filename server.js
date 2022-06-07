const express = require("express")
const app = express()
const mongoose = require('mongoose')
const User = require("./models/Users")

const mongoDB = `mongodb+srv://davidrimon:davidrimon@cluster0.q9y9f.mongodb.net/Cost-Manager?retryWrites=true&w=majority`;
mongoose.connect(mongoDB);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.set("view engine","ejs")
app.use(logger)

app.get("/", logger,(req, res)=>{
    res.render("index", {text: "world"})
})

const userRouter = require("./routes/users")

app.use("/users", userRouter)

function logger(req, res, next) {
    console.log(req.originalUrl)
    next()
}
app.listen(3000, () => {
    console.log("Server is running ar port 3000");
})


run()
async function run() {
    try {
        const user = await User.create({
            first_name: "Kyle",
            last_name: "Koko",
            birthday: Date.now(),
            marital_status: "married",
            occupation: {
                comapny: "Crossix",
                role: "NOC"
            }
        })
        console.log(user)
    } catch (e) {
        console.log(e.message)
    }
}