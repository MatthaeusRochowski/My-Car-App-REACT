const express = require("express");
const router = express.Router();
const Logbook = require("../models/Logbook");
const mongoose = require("mongoose");


/* // GET /api/logbook

router.get("/:carId", (req, res) => {

  console.log("Logbook -----> inside get route");

  Logbook.find({car_ref: req.params.carId})
  .then(logs => {
    res.json(logs);
  })
  .catch(err => {
    res.status(500).json(err);
  });
}); */

// POST /api/logbook
router.post("/", (req, res) => {
  // create one logbook entry

  console.log("Logbook -----> inside post route");
  console.log("Logbook -----> Request: ", req.body);

  var log = new Logbook({
    car_ref: req.body.car_ref,
    datum: req.body.datum,
    strecke_km: req.body.strecke_km,
    startort: req.body.startort,
    zielort: req.body.zielort,
    kilometerstand_start: req.body.kilometerstand_start,
    kilometerstand_ende: req.body.kilometerstand_ende
  });

  console.log("Logbook -----> New logbook entry: ", log);

  log
    .save()

    .then(log => {
      console.log("Logbook entry saved");
      res.json(log);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
