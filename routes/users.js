const express = require('express')
const { route } = require('express/lib/application')
const router = express.Router()
const userModel = require('../models/User')
const bodyParser = require('body-parser');

router.get("/", async (req, res) => {
    //res.send("User list")
    var users = await userModel.find({});

    try {
      res.send(users);
    } catch (error) {
      res.status(500).send(error);
    }
})

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

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
  .get( getUser, (req, res) => {
    res.json(res.user)
    /*var user = await userModel.findOne({"_id":req.params.id});
    try {
      res.send(user);
    } catch (error) {
      res.status(500).send(error);
    }*/
  })
  .put( getUser, async (req, res) => {
    //res.send(`Update User With ID ${req.params.id}`)
    if (req.body.first_name != null) {
      res.user.first_name = req.body.first_name
    }
    if (req.body.last_name != null) {
      res.user.last_name = req.body.last_name
    }
    if (req.body.birthday != null) {
      res.user.birthday = req.body.birthday
    }
    if (req.body.marital_status != null) {
      res.user.marital_status = req.body.marital_status
    }
    if (req.body.occupation != null) {
      res.user.occupation = req.body.occupation
    }
    try {
      const updatedUser = await res.user.save()
      res.json(updatedUser)
    } catch (err) {
      res.status(400).json({ message: err.message})
    }
  })
  .delete( getUser, async (req, res) => {
    //res.send(`Delete User With ID ${req.params.id}`)
    try {
      await res.user.remove()
      res.json({ message: 'Deleted User'})
    } catch (err) {
      res.status(500).json({ message: err.message})
    }
  })

async function getUser(req, res, next) {
  let user
  try{
    user = await userModel.findById(req.params.id)
    if (user == null) {
      console.log('user == null')
      return res.status(404).json({ message: 'Cannot find user'})
    }
  } catch (err) {
    if (user == null) {
      console.log('user == null')
      return res.status(404).json({ message: 'Cannot find user'})
    }
    console.log('user != null')
    return res.status(500).json({ message: err.message})
  }

  res.user = user
  next()
}


const users = [{ name: "Kyle" }, { name: "Sally" }]
router.param("id", (req, res, next, id) => {
  req.user = users[id]
  next()
})

module.exports = router
