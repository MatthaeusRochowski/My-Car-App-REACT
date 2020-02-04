const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const logbookSchema = new Schema({
  car_ref: { type: Schema.Types.ObjectId, ref: "Car" },
  datum: { type: String }, //2020-12-31
  strecke_km: { type: Number }, //50 (will be calculated kilometerstandende - kilometerstand_start)
  startort: { type: String }, //zuhause
  zielort: { type: String }, //arbeit
  kilometerstand_start: { type: Number }, //12000 (defaulted to kilometerstand_aktuell)
  kilometerstand_ende: { type: Number } //12050
});

const Logbook = mongoose.model("Logbook", logbookSchema);

module.exports = Logbook;
