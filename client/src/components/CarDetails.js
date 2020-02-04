import React, { Component } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";

export default class CarDetails extends Component {
  state = {
    car: {
      kennzeichen: "",
      hersteller: "",
      modell: "",
      kraftstoff: "",
      verbrauch: "",
      leistung_ps: "",
      erstzulassung_monat: "",
      erstzulassung_jahr: "",
      kaufdaten: {
        kaufdatum: "",
        kaufpreis: "",
        laufleistung: ""
      },
      kilometerstand: "",
      bild: ""
    },

    editActive: false,

    error: ""
  };

  getData = () => {
    const id = this.props.match.params.id;

    axios
      .get(`/api/myCars/${id}`)
      .then(response => {
        console.log("Axios Call ----> Get Data executed", response);
        this.setState({
          car: response.data
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

  toggleEdit = () => {
    this.setState({
      editActive: !this.state.editActive
    });
  };

  handleChange = event => {
    console.log("Change handler", event);

    if (this.state.editActive) {
      let carCopy = this.state.car;
      let kaufdatenCopy = this.state.car.kaufdaten;

      if (carCopy[event.target.name]) {
        carCopy[event.target.name] = event.target.value;
        this.setState({
          car: carCopy
        });
      } else if (kaufdatenCopy[event.target.name]) {
        kaufdatenCopy[event.target.name] = event.target.value;
        this.setState({
          kaufdaten: kaufdatenCopy
        });
      }
    }
    console.log("change handler", event.target.name);
  };

  handleSubmit = event => {
    console.log("hadnle submit", this.state.car);
    event.preventDefault();
    const id = this.props.match.params.id;
    axios
      .put(`/api/myCars/${id}`, {
        car: this.state.car
      })
      .then(response => {
        this.setState({
          car: response.data,
          editActive: false
        });
        //console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const car = this.state.car;
    //const kaufdaten = this.state.kaufdaten;
    console.log(`CarDetails -----> rendered for car id`, car._id);
    console.log("Verbrauch", this.state.car.verbrauch);

    //const { kennzeichen, hersteller, modell, erstzulassung_monat,
    //erstzulassung_jahr, kraftstoff, verbrauch, leistung_ps, kilometerstand,
    //kaufdatum, kaufpreis, kilometerstand_bei_kauf } = this.state;

    console.log(this.state.editActive);

    return (
      <div>
        <h2>Fahrzeug Details für {car.kennzeichen}</h2>

        <Button onClick={this.toggleEdit}>Fahrzeugdaten ändern</Button>
        <form onSubmit={this.handleSubmit}>
          <div className="car-img-div">
            <img src={car.bild} className="car-image" alt="Autobild" />
          </div>

          <p className="p-class">
            <span>Kennzeichen:</span>
            <span>
              <input
                type="text"
                name="kennzeichen"
                id="kennzeichen"
                value={car.kennzeichen}
                onChange={this.handleChange}
              />
            </span>
          </p>
          <p className="p-class">
            <span>Hersteller:</span>
            <span>
              <input
                type="text"
                name="hersteller"
                id="hersteller"
                value={car.hersteller}
                onChange={this.handleChange}
              />
            </span>
          </p>
          <p className="p-class">
            <span>Modell:</span>
            <span>
              <input
                type="text"
                name="modell"
                id="modell"
                value={car.modell}
                onChange={this.handleChange}
              />
            </span>
          </p>
          <p className="p-class">
            <span>Erstzulassung Monat:</span>
            <span>
              <input
                type="text"
                name="erstzulassung_monat"
                id="erstzulassung_monat"
                value={car.erstzulassung_monat}
                onChange={this.handleChange}
              />
            </span>
          </p>
          <p className="p-class">
            <span>Erstzulassung Jahr:</span>
            <span>
              <input
                type="text"
                name="erstzulassung_jahr"
                id="erstzulassung_jahr"
                value={car.erstzulassung_jahr}
                onChange={this.handleChange}
              />
            </span>
          </p>
          <p className="p-class">
            <span>Kraftstoff:</span>
            <span>
              <input
                type="text"
                name="kraftstoff"
                id="kraftstoff"
                value={car.kraftstoff}
                onChange={this.handleChange}
              />
            </span>
          </p>
          <p className="p-class">
            <span>Verbrauch:</span>
            <span>
              <input
                type="text"
                name="verbrauch"
                id="verbrauch"
                value={car.verbrauch}
                onChange={this.handleChange}
              />
            </span>
          </p>
          <p className="p-class">
            <span>Leistung:</span>
            <span>
              <input
                type="text"
                name="leistung_ps"
                id="leistung_ps"
                value={car.leistung_ps}
                onChange={this.handleChange}
              />
            </span>
          </p>
          <p className="p-class">
            <span>Kilometerstand:</span>
            <span>
              <input
                type="text"
                name="kilometerstand"
                id="kilometerstand"
                value={car.kilometerstand}
                onChange={this.handleChange}
              />
            </span>
          </p>
          <p className="p-class">
            <span>Kaufdatum:</span>
            <span>
              <input
                type="text"
                name="kaufdatum"
                id="kaufdatum"
                value={car.kaufdaten.kaufdatum}
                onChange={this.handleChange}
              />
            </span>
          </p>
          <p className="p-class">
            <span>Kaufpreis:</span>
            <span>
              <input
                type="text"
                name="kaufpreis"
                id="kaufpreis"
                value={car.kaufdaten.kaufpreis}
                onChange={this.handleChange}
              />
            </span>
          </p>
          <p className="p-class">
            <span>Kilometerstand bei Kauf:</span>
            <span>
              <input
                type="text"
                name="laufleistung"
                id="laufleistung"
                value={car.kaufdaten.laufleistung}
                onChange={this.handleChange}
              />
            </span>
          </p>

          <Button type="submit">Edit</Button>
        </form>
      </div>
    );
  }
}
