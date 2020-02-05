import React, { Component } from 'react'
import { Form, Button } from "react-bootstrap";

export default class Car extends Component {
  render() {
    console.log("Car -----> rendered");
    console.log("Car ---> props", this.props.car)
    return (

<div className="car-partial">

    <div className="car-img-div"><img src={this.props.car.bild} className="car-image" alt="Autobild"/></div>
    <p className="p-class"><span>Kennzeichen:</span><span>{this.props.car.kennzeichen}</span></p>
    
    <p className="p-class"><span>Hersteller:</span><span>{this.props.car.hersteller}</span></p>
    
    <p className="p-class"><span>Modell:</span><span>{this.props.car.modell}</span></p>
    
    <p className="p-class"><span>Erstzulassung:</span><span>{this.props.car.erstzulassung_monat} / {this.props.car.erstzulassung_jahr}</span></p>
    
    <p className="p-class"><span>Kilometerstand:</span><span>{this.props.car.kilometerstand} km</span></p>

    <Button>Fahrt eintragen</Button>
    <Button>Rechnung erfassen</Button>

</div>
    )
  }
}
