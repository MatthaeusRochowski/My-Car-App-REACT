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
  console.log(req);

  //const loggedUser = req.session.user; 
  const { verbrauch, kennzeichen, hersteller, modell, kraftstoff, leistung_ps,
  erstzulassung_monat, erstzulassung_jahr, kaufdaten, kilometerstand,
   bild, eigner_ref} = req.body;

   //console.log(loggedUser, "status 500")
   console.log("inside post route", req.body)

  //let bild = "../client/build/DefaultPlatzhalter.png";
  //if (req.file) bild = req.file.url;
    Car.create({
      verbrauch, kennzeichen, hersteller, modell, kraftstoff, leistung_ps, 
      erstzulassung_monat, erstzulassung_jahr, kaufdaten, kilometerstand,
      bild, eigner_ref
    })
    
    .then(car => {
      res.json(car);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

  /*Car.create({
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
    bild: bild,
    
  })
    .then(car => {
      res.json(car);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});*/

console.log("Test car add" , Car)
module.exports = router;
