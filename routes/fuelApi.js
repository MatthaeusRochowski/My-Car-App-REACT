const express = require('express');
const router  = express.Router();
const axios   = require('axios');

/* GET home page */
router.get('/', (req, res, next) => {
  console.log("FuelStations: fuelAPIRoutes entered");
  const zipCode = req.query.zip;
  const geoUrl = "https://geocode.xyz/" + zipCode + "+DE?json=1";

  let testMode = true;
  if (!testMode) { 
    console.log("FuelStations: geocode call - before call is sent");
    axios.get(geoUrl)
    .then(geoResponse => {
      console.log("Backend: FuelStations: geoCode response received");
      //console.log("geoReponse: ", geoResponse.data);
      if (geoResponse.data.latt !== "" && geoResponse.data.longt !== "") {
        let latt = geoResponse.data.latt;
        let long = geoResponse.data.longt;
        let fuelApiKey = process.env.FUEL_API_KEY;
        let fuelUrl = "https://creativecommons.tankerkoenig.de/json/list.php?lat=" + latt + "&lng=" + long + "&rad=5&sort=dist&type=all&apikey=" + fuelApiKey;

        console.log("Backend: FuelStations: tankerkönig call - before call is sent");
        axios.get(fuelUrl)
        .then(fuelStationResponse => {
          console.log("FuelStations: - (live-mode) tankerkönig response received ");
          fuelStationResponse.data.testMode = testMode;
          //console.log(fuelStationResponse.data);
          return res.json({ ...fuelStationResponse.data });
        })
      }
    })
    .catch(error => {
      console.log("Backend: Error in GeoCode API call - fuelApi.js");
    });
  }
  else {
    console.log("Backend: FuelStations: - (test-mode) static 'response' data");
    let testFuelStations = {ok: true,license: "CC BY 4.0 - https://creativecommons.tankerkoenig.de",data: "MTS-K",status: "ok",stations: [{id: "9630e035-bfa7-4abc-aec6-d9042eb43a66",name: "Esso Tankstelle",brand: "ESSO",street: "MUENCHENER STR. 203",place: "NEUBURG",lat: 48.724312,lng: 11.207088,dist: 1.2,diesel: 1.259,e5: 1.409,e10: 1.429,isOpen: true,houseNumber: "",postCode: 86633},{id: "51d4b48b-a095-1aa0-e100-80009459e03a",name: "JET NEUBURG INGOLSTAEDTER STR. 30",brand: "JET",street: "INGOLSTAEDTER STR. 30",place: "NEUBURG",lat: 48.7428,lng: 11.183,dist: 1.5,diesel: 1.249,e5: 1.399,e10: 1.389,isOpen: true,houseNumber: "",postCode: 86633},{id: "97dece63-5d5e-45a7-bed6-805c00536429",name: "Pinoil",brand: "Pinoil",street: "Ingolstädter Straße",place: "Neuburg",lat: 48.74275,lng: 11.1824274,dist: 1.6,diesel: 1.289,e5: 1.439,e10: 1.429,isOpen: true,houseNumber: "31",postCode: 86633},{id: "4028ea62-94b9-4621-a983-78af9e927991",name: "BayWa Tankstelle Neuburg an der Donau",brand: "BayWa",street: "Augsburger Str.",place: "Neuburg an der Donau",lat: 48.732132,lng: 11.176332,dist: 1.7,diesel: 1.249,e5: 1.399,e10: 1.399,isOpen: true,houseNumber: "132",postCode: 86633},{id: "a76320c8-64a1-4b4a-8be8-ff90e56a30da",name: "NEUBURG/DONAU - AUGSBURGER STR.",brand: "Agip",street: "Augsburger Strasse",place: "Neuburg / Donau",lat: 48.72443,lng: 11.17728,dist: 1.9,diesel: 1.259,e5: 1.409,e10: 1.399,isOpen: true,houseNumber: "133",postCode: 86633},{id: "f56af7b0-c79c-45a2-a876-8fcfc33293c7",name: "Pinoil",brand: "Pinoil",street: "Donauwörther Straße",place: "Neuburg",lat: 48.73356,lng: 11.1671114,dist: 2.3,diesel: 1.289,e5: 1.439,e10: 1.429,isOpen: true,houseNumber: "62",postCode: 86633},{id: "4147006d-1bbd-4b8e-8749-5a6777fc043c",name: "Aral Tankstelle",brand: "ARAL",street: "Am Südpark",place: "Neuburg",lat: 48.72019,lng: 11.172039,dist: 2.5,diesel: 1.299,e5: 1.439,e10: 1.429,isOpen: true,houseNumber: "2",postCode: 86633},{id: "00061195-0001-4444-8888-acdc00000001",name: "Wittmann Oil",brand: "Wittmann Oil",street: "Sehensander Weg",place: "Neuburg",lat: 48.722869873047,lng: 11.168399810791,dist: 2.5,diesel: 1.249,e5: null,e10: null,isOpen: true,houseNumber: "25",postCode: 86633}]};
    testFuelStations.testMode = testMode;
    //console.log(testFuelStations);
    return res.json(testFuelStations);
  }
})

module.exports = router;
