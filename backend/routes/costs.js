const express = require('express')
const { route } = require('express/lib/application')
const router = express.Router()
const userModel = require('../models/User')
const costModel = require('../models/Cost')
const monthCostModel = require('../models/MonthCost')


router.get("/", async (req, res) => {
    var costs = await costModel.find({});

    try {
      res.send(costs);
    } catch (error) {
      res.status(500).send(error);
    }
})

//currently, the post method insert a cost to specific user!!! We still need to calculate the montly cost and update the monthCost collection
router.post("/", async (req, res) => {
    const cost = new costModel({
        userId: req.body.userId,
        category: req.body.category,
        sum: req.body.sum,
        description: req.body.description,
        date: req.body.date
    })
    try {
      userIdCost = req.body.userId
      sumCost = req.body.sum
      categoryCost = req.body.category

      //
      var d = new Date(req.body.date);
      var months = [ "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December" ];
      //
      monthCost = months[d.getMonth()];
      yearCost = d.getFullYear();
      console.log(yearCost);

      let editMonthCost
      editMonthCost = await monthCostModel.findOne({"userId": userIdCost, "category": categoryCost,"month": monthCost, "year": yearCost})
      if(editMonthCost == null) {
        editMonthCost = new monthCostModel({
          userId: userIdCost,
          category: categoryCost,
          month: monthCost,
          year: yearCost,
          sum: sumCost
        })
      } else {
        editMonthCost.sum = editMonthCost.sum + sumCost;
        console.log("need to raise the sum")
      }
      const newMonthCost = await editMonthCost.save()
      const newCost = await cost.save()
      res.status(201).json(newCost)
      console.log(cost)
  } catch (e) {
    res.status(400).json({message: e.message})
    console.log(e.message)
  }
})


//getting the sum of cost per month and year
router.get("/monthly", async (req, res) => {
  let montlyCost
  try{
    montlyCost = await monthCostModel.find({"month": req.body.month, "year": req.body.year})
    if (montlyCost == null) {
      console.log('montlyCost == null1')
      return res.status(404).json({ message: 'Cannot find this monthly cost'})
    }
  } catch (err) {
    if (montlyCost == null) {
      console.log('montlyCost == null')
      console.log(err.message)
      return res.status(404).json({ message: 'Cannot find this monthly cost'})
    }
    console.log('montlyCost != null')
    return res.status(500).json({ message: err.message})
  }
  res.json(montlyCost)
})

/*
router
  .route("/:id")
  .get( getUser, (req, res) => {
    res.json(res.user)
  })
  .put( getUser, async (req, res) => {
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
    try {
      await res.user.remove()
      res.json({ message: 'Deleted Cost'})
    } catch (err) {
      res.status(500).json({ message: err.message})
    }
  })

async function getUser(req, res, next) {
  let user
  try{
    user = await costModel.findById(req.params.id)
    if (user == null) {
      console.log('user == null')
      return res.status(404).json({ message: 'Cannot find this cost'})
    }
  } catch (err) {
    if (user == null) {
      console.log('user == null')
      return res.status(404).json({ message: 'Cannot find this cost'})
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
*/
module.exports = router
