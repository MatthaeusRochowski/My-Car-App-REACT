// Routes to protected car pages
const express = require("express");
const router = express.Router();
const Car = require("../models/Car") || require("./models/Car");
const mongoose = require("mongoose");
//const APIHandler = require("../APIhandler");
//const outerAPIs = new APIHandler(); 

//const uploadCloud = require("../config/cloudinary.js");


// GET /api/myCars
router.get("/", (req, res) => {
  // return all projects
  Car.find({})
    .populate("eigner_ref")
    .then(cars => {
      res.json(cars);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});


// GET /api/mycars/:id
router.get("/:id", (req, res) => {
  // return 1 car w/ a given id
  const carId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(carId)) {
    res.status(400).json({ message: "CarId is not valid" });
    return;
  }

  Car.findById(carId)
    .populate("eigner_ref")
    .then(car => {
      if (!car) {
        res.status(404).json({ message: "Project not found" });
      } else res.json(car);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
