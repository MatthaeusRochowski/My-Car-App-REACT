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

// POST /api/myCars
router.post("/", (req, res) => {
  // create 1 car

  const loggedUser = req.session.user;

  let bild = "/DefaultPlatzhalter.png";
  if (req.file) bild = req.file.url;

  Car.create({
    eigner_ref: loggedUser._id,
    kennzeichen: req.body.kennzeichen,
    hersteller: req.body.hersteller,
    modell: req.body.modell,
    kraftstoff: req.body.kraftstoff,
    leistung_ps: req.body.leistung,
    erstzulassung_monat: req.body.erstzulassung_monat,
    erstzulassung_jahr: req.body.erstzulassung_jahr,
    kaufdaten: {
      kaufdatum: req.body.kaufdaten.kaufdatum,
      kaufpreis: req.body.kaufdaten.kaufpreis,
      kilometerstand: req.body.kaufdaten.kilometerstand
    },
    kilometerstand: req.body.kaufdaten.kilometerstand,
    bild: bild
  })
    .then(car => {
      res.json(car);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// PUT /api/myCars/:id
router.put("/:id", (req, res) => {
  Car.findByIdAndUpdate(req.params.id, {
    kennzeichen: req.body.kennzeichen,
    hersteller: req.body.hersteller,
    modell: req.body.modell,
    erstzulassung_monat: req.body.erstzulassung_monat,
    erstzulassung_jahr: req.body.erstzulassung_jahr,
    kraftstoff: req.body.kraftstoff,
    verbrauch: req.body.verbrauch,
    leistung_ps: req.body.leistung_ps,
    kilometerstand: req.body.kilometerstand,
    kaufdaten: {
      kaufdatum: req.body.kaufdatum,
      kaufpreis: req.body.kaufpreis,
      kilometerstand: req.body.kilometerstand_bei_kauf
    }
  })
    .then(car => {
      res.json(car);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
