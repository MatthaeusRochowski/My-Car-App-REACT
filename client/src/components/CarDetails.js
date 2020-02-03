import React, { Component } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";

export default class CarDetails extends Component {
  state = {
    car: "",
    kaufdaten: "",

    kennzeichen: "",
    hersteller: "",
    modell: "",
    erstzulassung_monat: "",
    erstzulassung_jahr: "",
    kraftstoff: "",
    verbrauch: "",
    leistung_ps: "",
    kilometerstand: "",
    kaufdatum: "",
    kaufpreis: "",
    kilometerstand_bei_kauf: "",

    editActive: false,

    error: ""
  };

  getData = () => {
    const id = this.props.match.params.id;

    axios
      .get(`/api/myCars/${id}`)
      .then(response => {
        const res = response.data;
        console.log(res)
        this.setState({
          car: res,
          kaufdaten: res.kaufdaten,
          kennzeichen: res.kennzeichen,
          hersteller: res.hersteller,
          modell: res.modell,
          erstzulassung_monat: res.erstzulassung_monat,
          erstzulassung_jahr: res.erstzulassung_jahr,
          kraftstoff: res.kraftstoff,
          verbrauch: res.verbrauch,
          leistung_ps: res.leistung_ps,
          kilometerstand: res.kilometerstand,
          kaufdatum: res.kaufdaten.kaufdatum,
          kaufpreis: res.kaufdaten.kaufpreis,
          kilometerstand_bei_kauf: res.kaufdaten.kilometerstand,
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
    this.state.editActive &&
      this.setState({
        [event.target.name]: event.target.value
      });
  };

  handleSubmit = event => {
    event.preventDefault();
    const id = this.props.match.params.id;
    axios
      .put(`/api/myCars/${id}`, {
        kennzeichen: this.state.kennzeichen,
        hersteller: this.state.hersteller,
        modell: this.state.modell,
        erstzulassung_monat: this.state.erstzulassung_monat,
        erstzulassung_jahr: this.state.erstzulassung_jahr,
        kraftstoff: this.state.kraftstoff,
        verbrauch: this.state.verbrauch,
        leistung_ps: this.state.leistung_ps,
        kilometerstand: this.state.kilometerstand,
        kaufdaten: {
          kaufdatum: this.state.kaufdatum,
          kaufpreis: this.state.kaufpreis,
          kilometerstand: this.state.kilometerstand_bei_kauf
        }
      })
      .then(response => {
        this.setState({
          car: response.data,
          editActive: false
        });
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const car = this.state.car;
    //const kaufdaten = this.state.kaufdaten;
    console.log(`CarDetails -----> rendered for car id`, car._id);

    const { kennzeichen, hersteller, modell, erstzulassung_monat, 
      erstzulassung_jahr, kraftstoff, verbrauch, leistung_ps, kilometerstand, 
      kaufdatum, kaufpreis, kilometerstand_bei_kauf } = this.state;

    console.log(this.state.editActive);

    return (
      <div>
        <h2>Fahrzeug Details für {car.kennzeichen}</h2>

        <Button onClick={ this.toggleEdit }>Fahrzeugdaten ändern</Button>
        <form onSubmit={ this.handleSubmit }>

        <div className="car-img-div">
          <img src={ car.bild } className="car-image" alt="Autobild" />
        </div>

        <p className="p-class">
          <span>Kennzeichen:</span>
          <span>
            <input
              type="text"
              name="kennzeichen"
              id="kennzeichen"
              value={ kennzeichen }
              onChange={ this.handleChange }
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
              value={ hersteller }
              onChange={ this.handleChange }
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
              value={ modell }
              onChange={ this.handleChange }
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
              value={ erstzulassung_monat }
              onChange={ this.handleChange }
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
              value={ erstzulassung_jahr }
              onChange={ this.handleChange }
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
              value={ kraftstoff }
              onChange={ this.handleChange }
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
              value={ verbrauch }
              onChange={ this.handleChange }
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
              value={ leistung_ps }
              onChange={ this.handleChange }
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
              value={ kilometerstand }
              onChange={ this.handleChange }
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
              value={ kaufdatum }
              onChange={ this.handleChange }
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
              value={ kaufpreis }
              onChange={ this.handleChange }
            />
          </span>
        </p>
        <p className="p-class">
          <span>Kilometerstand bei Kauf:</span>
          <span>
            <input
              type="text"
              name="kilometerstand_bei_kauf"
              id="kilometerstand_bei_kauf"
              value={ kilometerstand_bei_kauf }
              onChange={ this.handleChange }
            />
          </span>
        </p>

        <Button type="submit">Edit</Button>
        </form>
      </div>
    );
  }
}
