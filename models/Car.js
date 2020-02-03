const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const carSchema = new Schema({
  eigner_ref: { type: Schema.Types.ObjectId, ref: "User" },
  kennzeichen: { type: String, unique: true }, //IN12345
  hersteller: { type: String }, //Honda
  modell: { type: String }, //Civic 1.8
  kraftstoff: { type: String  }, //Benzin
  verbrauch: { type: String }, // Verbrauch lt. Hersteller oder geschätzter Verbrauch
  leistung_ps: { type: Number }, //140
  erstzulassung_monat: { type: Number }, //1 (Januar)
  erstzulassung_jahr: { type: Number }, //2020
  kaufdaten: {
    kaufdatum: {type: String}, //2014-03-01
    kaufpreis: {type: Number}, //20000
    kilometerstand: {type: Number} //90000
  },
  kilometerstand: { type: Number }, //12000 (updated by most recent kilometerstand_ende)
  bild:                   { type: String }, //http://cloudinary....
  kilometerkosten:        { type: Number }, //experimental
});

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
