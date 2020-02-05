import React, { Component } from 'react';
import axios from "axios";
import FuelStationMap from './FuelStationMap';

export default class FuelStations extends Component {
  //test mode is controlled by servers routes/fuelApi.js
  state = {
    zip: "",
    fuelstations: [],
    sortOrder: "distance",
    testMode: true
  }

  handleInputChanges = (event) => {
    let { name, value } = event.target;
    this.setState({ [name]: value });   
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    let fuelStationRequestUrl = "/api/getFuelStations?zip=";
    fuelStationRequestUrl += (this.state.zip === "") ? "85053" : this.state.zip;
    console.log("Frontend: FuelStations: FuelStations.js  - before Backend call");
    axios.get(fuelStationRequestUrl)
    .then(response => {
      console.log("Frontend: FuelStations: FuelStations.js - response received: ");
      //console.log(response.data);
      //console.log(response.data.stations);
      //console.log(response.data.testMode);
      this.setState({ 
        fuelstations: response.data.stations,
        testMode: response.data.testMode
      });
    })
  }

  render() {
    console.log("Frontend: FuelStations: FuelStations.js - render invoked");
    console.log("Frontend: FuelStations: FuelStations.js - testMode: ", this.state.testMode);
    console.log("Frontend: FuelStations: FuelStations.js - fuelstation state:", this.state.fuelstations);
    console.log("Frontend: FuelStations: FuelStations.js - sortOrder state:", this.state.sortOrder);
    let currFuelStations = this.state.fuelstations
    currFuelStations.map((oneFuelStation, index) => {
      if (index === 0) {
        return oneFuelStation.color = 'red';
      }
      else {
        if (index%2 === 1) {
          return oneFuelStation.color = 'lightgreen';
        }
        else {
          return oneFuelStation.color = 'lightblue';
        }
      }
    });

    let googleMapsMarker = {lat: 48.731, lng: 11.187};
    let googleMapsMarkerCenterInterim = {};
    let googleMapsMarkerCenter = {lat: 48.731, lng: 11.187};
    if (currFuelStations.length > 0) {
      let sortOrder = this.state.sortOrder;
      googleMapsMarker = currFuelStations.sort(function(stationA, stationB) {
        switch(sortOrder) {
          case "distance":
            if (stationA.dist > stationB.dist) { //ascending
              return 1;
            } else if (stationA.dist < stationB.dist) {
              return -1;
            } else return 0;
          case "e5price":
            if (stationA.e5 === null) { //compensate for empty values
              return 1;
            } else if (stationB.e5 === null) { //compensate for empty values
              return -1;
            } else if ((stationA.e5 - stationB.e5) === 0) {
              return stationA.dist - stationB.dist;
            } else return stationA.e5 - stationB.e5;
          case "e10price":
            if (stationA.e10 === null) { //compensate for empty values
              return 1;
            } else if (stationB.e10 === null) { //compensate for empty values
              return -1;
            } else if ((stationA.e10 - stationB.e10) === 0) {
              return stationA.dist - stationB.dist;
            } else return stationA.e10 - stationB.e10;
          case "dieselprice":
            if (stationA.diesel === null) { //compensate for empty values
              return 1;
            } else if (stationB.diesel === null) { //compensate for empty values
              return -1;
            } else if ((stationA.diesel - stationB.diesel) === 0) {
              return stationA.dist - stationB.dist;
            } else return stationA.diesel - stationB.diesel;
          default:
            return 0;
        }
      }).map((oneFuelStation, index) => {
        if (index === 0) {
          if (oneFuelStation.hasOwnProperty('place')) {
            oneFuelStation['city'] = oneFuelStation.place;  //renamed place to city as this solves an unexpected error in index.js
            delete oneFuelStation['place'];
          }
          return {index: index, ...oneFuelStation, color: 'red'}
        }
        else {
          if (oneFuelStation.hasOwnProperty('place')) {
            oneFuelStation['city'] = oneFuelStation.place;  //renamed place to city as this solves an unexpected error in index.js
            delete oneFuelStation['place'];
          }
          return {index: index, ...oneFuelStation, color: 'blue'}
        }
      });
      console.log("sorted markers: ", googleMapsMarker);

      googleMapsMarkerCenterInterim = googleMapsMarker.reduce(function (acc, cur) {
        let res = {minLat: cur.lat, maxLat: cur.lat, minLng: cur.lng, maxLng: cur.lng}
        acc.minLat > cur.lat ? res.minLat = cur.lat : res.minLat = acc.minLat
        acc.minLng > cur.lng ? res.minLng = cur.lng : res.minLng = acc.minLng
        acc.maxLat < cur.lat ? res.maxLat = cur.lat : res.maxLat = acc.maxLat
        acc.maxLng < cur.lng ? res.maxLng = cur.lng : res.maxLng = acc.maxLng
        return res;
      },{minLat: 999999, maxLat: 0, minLng: 999999, maxLng: 0});

      let centerLat = Math.round((googleMapsMarkerCenterInterim.minLat+((googleMapsMarkerCenterInterim.maxLat-googleMapsMarkerCenterInterim.minLat)/2))*1000)/1000;
      let centerLng = Math.round((googleMapsMarkerCenterInterim.minLng+((googleMapsMarkerCenterInterim.maxLng-googleMapsMarkerCenterInterim.minLng)/2))*1000)/1000;
      googleMapsMarkerCenter = { lat: centerLat, lng: centerLng };
      //console.log("google maps center coords: ", googleMapsMarkerCenter);
    }

    let mapsForm = (
      <form onSubmit={this.handleFormSubmit}>
        <label htmlFor="zip">Postleitzahl: </label>
        <input name="zip" type="text" minLength="5" maxLength="5" onChange={this.handleInputChanges} placeholder="z.B. 85083" />
        <label htmlFor="sortOrder">Sortierung nach: </label>
        <select name="sortOrder" onChange={this.handleInputChanges}>
          <option value="distance">Entfernung</option>
          <option value="e5price">E5-Preis</option>
          <option value="e10price">E10-Preis</option>
          <option value="dieselprice">Diesel-Preis</option>
        </select>
        <button type="submit">Request</button>
      </form>
      ) 

    return (
      <div>
        <h1>Tankstellen im Umkreis</h1>
        {mapsForm}
        <div id="googleMaps">
          {currFuelStations.length > 0 ? (
            <FuelStationMap center={googleMapsMarkerCenter} markers={googleMapsMarker} />
            ) : (
            console.log("Frontend: FuelStations: FuelStations.js - empty fuelstations state (array) - maps")
          )}
        </div>
      </div>
    )
  }
}
