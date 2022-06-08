const express = require('express')
const { route } = require('express/lib/application')
const router = express.Router()
const userModel = require('../models/Users')


router.get("/", async (req, res) => {
    //res.send("User list")
    var users = await userModel.find({});

    try {
      res.send(users);
    } catch (error) {
      res.status(500).send(error);
    }
})

router.post("/", async (req, res) => {
    //res.send('Create User')
    //var reqBody = JSON.stringify(req.body);
    const user = new userModel({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      birthday: req.body.birthday,
      marital_status: req.body.marital_status,
      occupation: {
          comapny: req.body.occupation.comapny,
          role: req.body.occupation.role
      }
    })
    try {
      const newUser = await user.save()
      res.status(201).json(newUser)
        /*first_name: String,
        last_name: String,
        birthday: Date,
        marital_status: String,
        occupation: occupationSchema*/
      console.log(user)
  } catch (e) {
    res.status(400).json({message: err.message})
    console.log(e.message)
  }
})

router.get("/new", (req, res) => {
    res.send("User New Form")

})

router
  .route("/:id")
  .get( async (req, res) => {
    console.log(req.user)
    //res.send(`Get User With ID ${req.params.id}`)
    var user = await userModel.findOne({"_id":req.params.id});
    try {
      res.send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  })
  .put((req, res) => {
    res.send(`Update User With ID ${req.params.id}`)
  })
  .delete((req, res) => {
    res.send(`Delete User With ID ${req.params.id}`)
  })

const users = [{ name: "Kyle" }, { name: "Sally" }]
router.param("id", (req, res, next, id) => {
  req.user = users[id]
  next()
})

module.exports = router
