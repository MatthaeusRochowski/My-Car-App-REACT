import React, { Component } from 'react'

export default class FuelStation_One extends Component {
  render() {
    console.log("Frontend: FuelStations: FuelStations_One.js  - render invoked");
    //console.log("Frontend: FuelStations: FuelStations_One.js  - fuelstation props:", this.props);
    return (
        <div className="fuelstation">
            <p><b><span style={{backgroundColor: this.props.color}}>Tankstelle: {this.props.index}</span></b><br/> {this.props.brand} {this.props.street}<br/> ({this.props.place})</p>
            <p><b>Entfernung (km):</b> {this.props.dist}</p>
            <p><b>Benzin (E5):</b> {this.props.e5}</p>
            <p><b>Benzin (E10):</b> {this.props.e10}</p>
            <p><b>Diesel:</b> {this.props.diesel}</p>
        </div>
    )
  }
}
