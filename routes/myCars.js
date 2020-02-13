// Routes to protected car pages
const express = require("express");
const router = express.Router();
const Car = require("../models/Car");
//const Logbuch = require("../models/Car/Logbuch");
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

// POST /api/myCars/logbook/:id
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

// POST /api/myCars/invoice/:id
router.post("/invoice/:id", (req, res) => {
  console.log("Create invoice");
  console.log("Request: ", req.body);
  const invoice = req.body;
  const carId = req.params.id;

  Car.findById(carId)
    .then(returnedCar => {
      returnedCar.rechnungen.unshift(invoice);
      returnedCar.save().then(invoices => {
        res.json(invoices);
      });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// PUT /api/myCars/:id
router.put("/:id", (req, res) => {
  let carId = req.params.id;
  console.log("Backend put /:id ", carId);

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
router.put("/logbook/:id", (req, res) => {
  console.log("Inside PUT Logbook Route -----> Change Logbook");
  console.log("Inside PUT Logbook Route ----> Request: ", req.body);
  const carId = req.params.id;

  Car.findById(carId)
    .then(returnedCar => {
      returnedCar.logbuch = req.body.logbook
      returnedCar.save().then(logbook => {
        res.json(logbook);
      });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// PUT /api/myCars/logbook/:id
router.put("/invoice/:id", (req, res) => {
  console.log("Inside PUT Invoice Route -----> Change Invoice");
  console.log("Inside PUT Invoice Route ----> Request: ", req.body);
  const carId = req.params.id;

  Car.findById(carId)
    .then(returnedCar => {
      returnedCar.rechnungen = req.body.invoices
      returnedCar.save().then(invoices => {
        res.json(invoices);
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

// DELETE /api/myCars/logbook
router.delete("/logbook/delete", (req, res) => {
  //console.log("Inside Delete Logook Route -----> request query: ", req.query),
  const carId = req.query.carId;
  const logId = req.query.logId;

  console.log("Log to be deleted: ", logId);

  Car.findById({ _id: mongoose.Types.ObjectId(carId) })
    .then(foundCar => {
      for (let index in foundCar.logbuch) {
        if (foundCar.logbuch[index]._id.toString() === logId.toString()) {
          foundCar.logbuch.splice(index, 1);
          foundCar.save();
          res.json({ foundCar });
        }
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// DELETE /api/myCars/invoice
router.delete("/invoice/delete", (req, res) => {
  //console.log("Inside Delete Invoice Route -----> request query: ", req.query),
  const carId = req.query.carId;
  const invoiceId = req.query.invoiceId;

  console.log("Invoice to be deleted: ", invoiceId);

  Car.findById({ _id: mongoose.Types.ObjectId(carId) })
    .then(foundCar => {
      for (let index in foundCar.rechnungen) {
        if (foundCar.rechnungen[index]._id.toString() === invoiceId.toString()) {
          foundCar.rechnungen.splice(index, 1);
          foundCar.save();
          res.json({ foundCar });
        }
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
