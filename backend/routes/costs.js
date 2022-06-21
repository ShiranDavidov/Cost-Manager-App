const express = require('express');
//const { route } = require('express/lib/application');
const router = express.Router();
//const userModel = require('../models/userModel');
const costModel = require('../models/costModel');
const monthCostModel = require('../models/monthCostModel');


router.get("/", async (req, res) => {
    var costs = await costModel.find({});

    try {
      res.send(costs);
    } catch (error) {
      res.status(500).send(error);
    }
})

router.post("/", async (req, res) => {
    const cost = new costModel({
        userId: req.body.userId,
        category: req.body.category,
        sum: req.body.sum,
        description: req.body.description,
        date: req.body.date
    });
    try {
      userIdCost = req.body.userId;
      sumCost = Number(req.body.sum);
      categoryCost = req.body.category;
      var date = new Date(req.body.date);
      var months = [ "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December" ];
      monthCost = months[date.getMonth()];
      yearCost = date.getFullYear();
      //console.log(yearCost);

      let editMonthCost;
      editMonthCost = await monthCostModel.findOne({"userId": userIdCost, "category": categoryCost,"month": monthCost, "year": yearCost});
      if(editMonthCost == null) {
        editMonthCost = new monthCostModel({
          userId: userIdCost,
          category: categoryCost,
          month: monthCost,
          year: yearCost,
          sum: sumCost
        })

        console.log('no costs from that month');
      } else {
        editMonthCost.sum = editMonthCost.sum + sumCost;
        console.log('cost added to the montly costs');
      }
      const newMonthCost = await editMonthCost.save();
      const newCost = await cost.save();
      res.status(201).json(newCost);
      console.log(cost);
  } catch (error) {
    res.status(400).json({message: error.message});
    console.log(error.message);
  }
})

//getting the sum of cost per month and year
router.get("/monthly", async (req, res) => {
  let montlyCost;
  try{
    montlyCost = await monthCostModel.find({"userId": req.query.userId, "month": req.query.month, "year": req.query.year});
    if (montlyCost == null) {
      console.log('montlyCost == null');
      return res.status(404).json({ message: 'Cannot find this monthly cost'});
    }
  } catch (error) {
    if (montlyCost == null) {
      console.log('montlyCost == null');
      console.log(error.message);
      return res.status(404).json({ message: 'Cannot find this monthly cost'});
    }
    console.log('montlyCost != null');
    return res.status(500).json({ message: error.message});
  }
  res.json(montlyCost);
})

module.exports = router;
