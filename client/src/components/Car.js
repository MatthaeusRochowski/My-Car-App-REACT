import React, { Component } from "react";
import {Link} from "react-router-dom";
import { Button } from "react-bootstrap";

export default class Car extends Component {
  render() {
    console.log("Car -----> rendered");
    console.log("Car ---> props", this.props.car);
    return (
      <div className="car-partial">

        <Link to={`/myCars/${this.props.car._id}`}>
          <div className="car-img-div">
            <img
              src={this.props.car.bild}
              className="car-image"
              alt="Autobild"
            />
          </div>
        </Link>

        <p className="p-class">
          <span>Kennzeichen:</span>
          <span>{this.props.car.kennzeichen}</span>
        </p>

        <p className="p-class">
          <span>Hersteller:</span>
          <span>{this.props.car.hersteller}</span>
        </p>

        <p className="p-class">
          <span>Modell:</span>
          <span>{this.props.car.modell}</span>
        </p>

        <p className="p-class">
          <span>Erstzulassung:</span>
          <span>
            {this.props.car.erstzulassung_monat} /{" "}
            {this.props.car.erstzulassung_jahr}
          </span>
        </p>

        <p className="p-class">
          <span>Kilometerstand:</span>
          <span>{this.props.car.kilometerstand} km</span>
        </p>

        <Link to={`/myCars/${this.props.car._id}/addLog`}><Button variant="info" className="button">Fahrt eintragen</Button></Link>
        <Link to={`/myCars/${this.props.car._id}/addInvoice`}><Button variant="info" className="button">Rechnung erfassen</Button></Link>
      </div>
    );
  }
}
