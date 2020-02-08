// Routes to protected car pages
const express = require("express");
const router = express.Router();
const Car = require("../models/Car");
const mongoose = require("mongoose");
//const APIHandler = require("../APIhandler");
//const outerAPIs = new APIHandler();

//const uploader = require("../config/cloudinary.js");

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
    .populate()
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
    kennzeichen: req.body.car.kennzeichen,
    hersteller: req.body.car.hersteller,
    modell: req.body.car.modell,
    kraftstoff: req.body.car.kraftstoff,
    verbrauch: req.body.car.verbrauch,
    leistung_ps: req.body.car.leistung_ps,
    erstzulassung_monat: req.body.car.erstzulassung_monat,
    erstzulassung_jahr: req.body.car.erstzulassung_jahr,
    kaufpreis: req.body.car.kaufpreis,
    kilometerstand: req.body.car.kaufdaten.laufleistung,
    kaufdaten: {
      kaufdatum: req.body.car.kaufdaten.kaufdatum,
      kaufpreis: req.body.car.kaufdaten.kaufpreis,
      laufleistung: req.body.car.kaufdaten.laufleistung
    },
    bild: req.body.car.bild,
    publicId: req.body.car.publicId
  });

  console.log("Post myCar", car);

  car
    .save()

    .then(car => {
      console.log("Car saved");
      res.json(car);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// PUT /api/myCars/:id

router.put("/:id", (req, res) => {
  let carId = req.params.id;

  Car.findById(carId)
    .then(returnedCar => {
      returnedCar.kennzeichen = req.body.kennzeichen;
      returnedCar.hersteller = req.body.hersteller;
      returnedCar.modell = req.body.modell;
      returnedCar.kraftstoff = req.body.kraftstoff;
      returnedCar.verbrauch = req.body.verbrauch;
      returnedCar.leistung_ps = req.body.leistung_ps;
      returnedCar.erstzulassung_monat = req.body.erstzulassung_monat;
      returnedCar.erstzulassung_jahr = req.body.erstzulassung_jahr;
      returnedCar.kaufpreis = req.body.kaufpreis;
      returnedCar.kilometerstand = req.body.kilometerstand;
      returnedCar.kaufdaten.kaufdatum = req.body.kaufdatum;
      returnedCar.kaufdaten.kaufpreis = req.body.kaufpreis;
      returnedCar.kaufdaten.laufleistung = req.body.kilometerstand_bei_kauf;
      returnedCar.save().then(car => {
        res.json(car);
      });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// PUT /api/myCars/logbook/:id
router.post("/logbook/:id", (req, res) => {
  console.log("Create logbook entry");
  console.log("Request: ", req.body);
  const logbookEntry = req.body;
  const carId = req.params.id;

  Car.findById(carId)
    .then(returnedCar => {
      if (logbookEntry.kilometerstand_ende > returnedCar.kilometerstand)
        returnedCar.kilometerstand = logbookEntry.kilometerstand_ende;
      returnedCar.logbuch.unshift(logbookEntry);
      returnedCar.save().then(logbook => {
        res.json(logbook);
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
