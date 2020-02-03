import React, { Component } from 'react';
import axios from "axios";

export default class CarDetails extends Component {

  state = {
    car: '',
    kaufdaten: ''
  }

  getData = () => {
    const id = this.props.match.params.id;
 
    axios
      .get(`/api/myCars/${id}`)
      .then(response => {
        console.log(`/api/myCars Response`, response);
        this.setState({
          car: response.data,
          kaufdaten: response.data.kaufdaten
        });
      })
      .catch(err => {
        if (err.response.status === 404) {
          this.setState({
            error: err.response.data.message
          });
        }
      });
  };

  componentDidMount() {
    this.getData();
  }
  render() {
    
    const car = this.state.car
    const kaufdaten = this.state.kaufdaten
    console.log(`CarDetails -----> rendered for car id`, car._id );

    return (

<div>

<h2>Fahrzeug Details für { car.kennzeichen }</h2>

<div className="car-img-div"><img src={ car.bild } className="car-image" alt="Autobild"/></div>
    <p className="p-class"><span>Kennzeichen:</span><span>{ car.kennzeichen }</span></p>
    
    <p className="p-class"><span>Hersteller:</span><span>{ car.hersteller}</span></p>
    
    <p className="p-class"><span>Modell:</span><span>{ car.modell }</span></p>
    
    <p className="p-class"><span>Erstzulassung:</span><span>{ car.erstzulassung_monat }/{ car.erstzulassung_jahr }</span></p>
    
    <p className="p-class"><span>Kraftstoff:</span><span>{ car.kraftstoff }</span></p>

    <p className="p-class"><span>Verbrauch:</span><span>{ car.verbrauch }</span></p>

    <p className="p-class"><span>Leistung:</span><span>{ car.leistung_ps } PS</span></p>

    <p className="p-class"><span>Aktueller Kilometerstand:</span><span>{ car.kilometerstand } km</span></p>
    
    <p className="p-class"></p>

    <p className="p-class">Kaufdaten:</p>

    <p className="p-class"><span>Kaufdatum:</span><span>{ kaufdaten.kaufdatum }</span></p>

    <p className="p-class"><span>Kaufpreis:</span><span>{ kaufdaten.kaufpreis }</span></p>

    <p className="p-class"><span>Kilometerstand:</span><span>{ kaufdaten.kilometerstand } km</span></p>



</div>
    )
  }
}