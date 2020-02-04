// Routes to protected car pages
const express = require("express");
const router = express.Router();
const Car = require("../models/Car");
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
    //  .populate("eigner_ref")
    .then(car => {
      res.json(car);
      //  if (!car) {
      //    res.status(404).json({ message: "Project not found" });
      // } else res.json(car);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// POST /api/myCars
router.post("/", (req, res) => {
  // create 1 car

  console.log("inside post route", req.body);

  var car = new Car({
      kennzeichen: req.body.kennzeichen,
      hersteller: req.body.hersteller,
      modell: req.body.modell,
      kraftstoff: req.body.kraftstoff,
      verbrauch: req.body.verbrauch,
      leistung_ps: req.body.leistung_ps,
      erstzulassung_monat: req.body.erstzulassung_monat,
      erstzulassung_jahr: req.body.erstzulassung_jahr,
      kaufpreis: req.body.kaufpreis,
      kilometerstand: req.body.kilometerstand,
      kaufdaten: {
        kaufdatum: req.body.kaufdaten.kaufdatum,
        kaufpreis: req.body.kaufdaten.kaufpreis,
        laufleistung: req.body.kaufdaten.laufleistung
      }
      })

    car.save()
        .then(car => {
          console.log("Car saved")
          res.json(car);
        })
        .catch(err => {
          res.status(500).json(err);
        });
    
    });


// PUT /api/myCars/:id
router.put("/:id", (req, res) => {
  let car = req.body.car;
  let carId = req.params.id;

  Car.findById(carId)
    .then(returnedCar => {
      returnedCar.kennzeichen = car.kennzeichen;
      returnedCar.hersteller = car.hersteller;
      returnedCar.modell = car.modell;
      returnedCar.kraftstoff = car.kraftstoff;
      returnedCar.verbrauch = car.verbrauch;
      returnedCar.leistung_ps = car.leistung_ps;
      returnedCar.erstzulassung_monat = car.erstzulassung_monat;
      returnedCar.erstzulassung_jahr = car.erstzulassung_jahr;
      returnedCar.kaufpreis = car.kaufpreis;
      returnedCar.kilometerstand = car.kilometerstand;
      returnedCar.kaufdaten.kaufdatum = car.kaufdaten.kaufdatum;
      returnedCar.kaufdaten.kaufpreis = car.kaufdaten.kaufpreis;
      returnedCar.kaufdaten.laufleistung = car.kaufdaten.laufleistung;
      returnedCar.save().then(car => {
        res.json(car);
      });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// DELETE /api/myCars/:id
router.delete("/:id", (req, res) => {
  Car.findByIdAndDelete(req.params.id)
    .then(car => {
      // Delete the image on cloudinary
      // cloudinary.uploader.destroy(car.imagePublicID);
      // Deletes all the documents in the Task collection where the value for the `_id` field is present in the `project.tasks` array
      //return Task.deleteMany({ _id: { $in: project.tasks } }).then(() =>
      res.json({ message: "ok" });
      //);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
