const express = require('express');
//const { route } = require('express/lib/application');
const router = express.Router();
const userModel = require('../models/userModel');

router.get("/", async (req, res) => {
    var users = await userModel.find({});

    try {
      res.send(users);
    } catch (error) {
      res.status(500).send(error);
    }
})

router.post("/", async (req, res) => {
    const user = new userModel({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      birthday: req.body.birthday,
      marital_status: req.body.marital_status,
      occupation: {
          comapny: req.body.occupation.comapny,
          role: req.body.occupation.role
      }
    });
    try {
      const newUser = await user.save();
      res.status(201).json(newUser);
      console.log(user);
  } catch (error) {
    res.status(400).json({message: error.message});
    console.log(error.message);
  }
})

router
  .route("/:id")
  .get( getUser, (req, res) => {
    res.json(res.user);
  })
  .put( getUser, async (req, res) => {
    if (req.body.first_name != null) {
      res.user.first_name = req.body.first_name;
    }
    if (req.body.last_name != null) {
      res.user.last_name = req.body.last_name;
    }
    if (req.body.birthday != null) {
      res.user.birthday = req.body.birthday;
    }
    if (req.body.marital_status != null) {
      res.user.marital_status = req.body.marital_status;
    }
    if (req.body.occupation != null) {
      res.user.occupation = req.body.occupation;
    }
    try {
      const updatedUser = await res.user.save();
      res.json(updatedUser);
    } catch (error) {
      res.status(400).json({ message: error.message});
    }
  })
  .delete( getUser, async (req, res) => {
    try {
      await res.user.remove();
      res.json({ message: 'Deleted User'});
    } catch (error) {
      res.status(500).json({ message: error.message});
    }
  });

async function getUser(req, res, next) {
  let user;
  try{
    user = await userModel.findById(req.params.id);
    if (user == null) {
      console.log('user == null');
      return res.status(404).json({ message: 'Cannot find user'});
    }
  } catch (error) {
    if (user == null) {
      console.log('user == null');
      return res.status(404).json({ message: 'Cannot find user'});
    }
    console.log('user != null');
    return res.status(500).json({ message: error.message});
  }

  res.user = user;
  next();
}

module.exports = router;
