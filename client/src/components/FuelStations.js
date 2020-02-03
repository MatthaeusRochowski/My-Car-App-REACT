import React, { Component } from 'react';
import axios from "axios";
import OneFuelStation from './FuelStation_One';

export default class FuelStations extends Component {

  state = {
    zip: "",
    fuelstations: []
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
      //console.log(response.data.stations);
      this.setState({ 
        fuelstations: response.data.stations
      });
    })
  }

  render() {
    console.log("Frontend: FuelStations: FuelStations.js  - render invoked");
    //console.log("Frontend: FuelStations: FuelStations.js  - fuelstation state:", this.state.fuelstations);
    let currFuelStations = this.state.fuelstations;
    return (
      <div>
        <h1>Nearby Fuelstations</h1>
        <form onSubmit={this.handleFormSubmit}>
          <label htmlFor="zip">Zip-Code:</label>
          <input name="zip" type="text" minLength="5" maxLength="5" onChange={this.handleInputKeyStrokes} placeholder="i.e. 85083" />
          <button type="submit">Request</button>
        </form>
        <div id="fuelstationAll">
          {currFuelStations.length > 0 ? (
            currFuelStations.map(oneFuelStation => { return <OneFuelStation key={oneFuelStation.id} {...oneFuelStation} /> })
            ) : (
            console.log("Frontend: FuelStations: FuelStations.js - empty fuelstations state (array)")
          )}
        </div>
      </div>
    )
  }
}
