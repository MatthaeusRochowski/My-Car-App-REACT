import React, { Component } from 'react';
import axios from "axios";
import OneFuelStation from './FuelStation_One';
import MapFuelStation from './FuelStation_Map';

export default class FuelStations extends Component {

  state = {
    zip: "",
    fuelstations: [],
    testMode: true
  }

  handleInputKeyStrokes = (event) => {
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
      this.setState({ 
        fuelstations: response.data.stations,
        testMode: response.data.testMode
      });
    })
  }

  render() {
    console.log(this.state.testMode);
    console.log("Frontend: FuelStations: FuelStations.js  - render invoked");
    //console.log("Frontend: FuelStations: FuelStations.js  - fuelstation state:", this.state.fuelstations, "testMode: " + this.state.testMode);
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

    let googleMapsUrl = "";
    let googleMapsMarker2 = {};
    let googleMapsMarker2Center = {};
    if (currFuelStations.length > 0) {
      let googleMapsMarker = currFuelStations.map((oneFuelStation, index) => {
        if (index === 0) {
          return ("&markers=color:red%7Clabel:" + String(index+1) + "%7C" + oneFuelStation.lat + "," + oneFuelStation.lng)
        }
        else {
          if (index%2 === 1) {
            return ("&markers=color:green%7Clabel:" + String(index+1) + "%7C" + oneFuelStation.lat + "," + oneFuelStation.lng);
          }
          else {
            return ("&markers=color:blue%7Clabel:" + String(index+1) + "%7C" + oneFuelStation.lat + "," + oneFuelStation.lng);
          }
        }
      });

      googleMapsMarker2 = currFuelStations.map((oneFuelStation, index) => {
        if (index === 0) {
          googleMapsMarker2Center = {lat: oneFuelStation.lat, lng: oneFuelStation.lng};
          return {index: index, text: oneFuelStation.name, lat: oneFuelStation.lat, lng: oneFuelStation.lng, color: 'red'}
        }
        else {
          if (index%2 === 1) {
            return {index: index, text: oneFuelStation.name, lat: oneFuelStation.lat, lng: oneFuelStation.lng, color: 'green'}
          }
          else {
            return {index: index, text: oneFuelStation.name, lat: oneFuelStation.lat, lng: oneFuelStation.lng, color: 'blue'}
          }
        }
      });
      //console.log(googleMapsMarker2Center);

      if (this.state.testMode) {
        googleMapsUrl = '';
      }
      else {
        googleMapsUrl = 'http://maps.googleapis.com/maps/api/staticmap?size=400x400' + googleMapsMarker.join('') + '&key=AIzaSyDPIPUZEpxhHJFKdfVta60o6N25Rvzm7aQ';
      }
      console.log(googleMapsUrl);
    }
    return (
      <div>
        <h1>Nearby Fuelstations</h1>
        <form onSubmit={this.handleFormSubmit}>
          <label htmlFor="zip">Zip-Code:</label>
          <input name="zip" type="text" minLength="5" maxLength="5" onChange={this.handleInputKeyStrokes} placeholder="i.e. 85083" />
          <button type="submit">Request</button>
        </form>
        {currFuelStations.length > 0 ? (
          <MapFuelStation center={googleMapsMarker2Center} markers={googleMapsMarker2} />
          ) : (
          console.log("Frontend: FuelStations: FuelStations.js - empty fuelstations state (array) - maps")
        )}
        <div id="fuelstationAll">
          {currFuelStations.length > 0 ? (
            currFuelStations.map((oneFuelStation, index) => { return <OneFuelStation key={oneFuelStation.id} {...oneFuelStation} index={String(index+1)} /> })
            ) : (
            console.log("Frontend: FuelStations: FuelStations.js - empty fuelstations state (array) - partial")
          )}
        </div>

      </div>
    )
  }
}
