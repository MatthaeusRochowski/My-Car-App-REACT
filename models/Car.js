const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const carSchema = new Schema({
  eigner_ref: { type: Schema.Types.ObjectId, ref: "User" },
  logbuch_ref: [{ type: Schema.Types.ObjectId, ref: "Logbook" }],
  kennzeichen: { type: String, unique: true }, //IN12345
  hersteller: { type: String }, //Honda
  modell: { type: String }, //Civic 1.8
  kraftstoff: { type: String }, //Benzin
  verbrauch: { type: String }, // Verbrauch lt. Hersteller oder geschätzter Verbrauch
  leistung_ps: { type: Number }, //140
  erstzulassung_monat: { type: Number }, //1 (Januar)
  erstzulassung_jahr: { type: Number }, //2020
  kaufdaten: {
    kaufdatum: { type: String }, //2014-03-01
    kaufpreis: { type: Number }, //20000
    laufleistung: { type: Number } //90000
  },
  kilometerstand: { type: Number }, //12000 (updated by most recent kilometerstand_ende)
  bild: { type: String }, //http://cloudinary....
  bildPublicID: { type: String },
  kilometerkosten: { type: Number }, //experimental

  logbuch: [
    {
      datum: { type: String }, //2020-12-31
      strecke_km: { type: Number }, //50 (will be calculated kilometerstandende - kilometerstand_start)
      startort: { type: String }, //zuhause
      zielort: { type: String }, //arbeit
      kilometerstand_start: { type: Number }, //12000 (defaulted to kilometerstand_aktuell)
      kilometerstand_ende: { type: Number } //12050
    }
  ],

  rechnungen: [
    {
      datum: { type: String }, //2020-12-31
      kilometerstand: { type: Number }, //12000
      rechnungstyp: {
        type: String,
        enum: ["Tanken", "Werkstatt", "Versicherung", "Steuer", "Wertverlust"],
        default: "Tanken"
      },
      betrag: { type: Number },
      rechnungs_url: { type: String }, //http://cloudinary....
      rechnungPublicID: { type: String }
    }
  ]
});

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
