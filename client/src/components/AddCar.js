import React, { Component } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

class AddCar extends Component {
  state = {
    car: {
      eigner_ref: this.props.user._id,
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
    }
  };

  handleChange = (event) => {

    let {name, value} = event.target;
    //console.log(name + " " + value);

      let carCopy = this.state.car;
      let kaufdatenCopy = this.state.car.kaufdaten;

      if (kaufdatenCopy.hasOwnProperty(name)) {
        console.log("in kaufdaten");
        kaufdatenCopy[name] = value;
        this.setState({
          kaufdaten: kaufdatenCopy
        });
      }
      else if (carCopy.hasOwnProperty(name)) {
        console.log("in car");
        carCopy[name] = value;
        this.setState({
          car: carCopy
        });
      }
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log("SUBMIT");

    axios
      .post("/api/myCars", {
        car: this.state.car
      })
      .then(() => {
        this.props.history.push("/myCars");
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    console.log("AddCar -----> rendered");
    console.log("AddCar props: ", this.props.user);

    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor="kennzeichen">Kennzeichen: </Form.Label>
            <Form.Control
              type="text"
              name="kennzeichen"
              id="kennzeichen"
              value={this.state.car.kennzeichen}
              onChange={this.handleChange}
            />
            <Form.Label htmlFor="hersteller">Hersteller: </Form.Label>
            <Form.Control
              type="text"
              name="hersteller"
              id="hersteller"
              value={this.state.car.hersteller}
              onChange={this.handleChange}
            />
            <Form.Label htmlFor="modell">Modell: </Form.Label>
            <Form.Control
              type="text"
              name="modell"
              id="modell"
              value={this.state.car.modell}
              onChange={this.handleChange}
            />
            <Form.Label htmlFor="kraftstoff">Kraftstoff: </Form.Label>
            <Form.Control
              type="text"
              name="kraftstoff"
              id="kraftstoff"
              value={this.state.car.kraftstoff}
              onChange={this.handleChange}
            />
            <Form.Label htmlFor="verbrauch">Verbrauch: </Form.Label>
            <Form.Control
              type="text"
              name="verbrauch"
              id="verbrauch"
              value={this.state.car.verbrauch}
              onChange={this.handleChange}
            />
            <Form.Label htmlFor="leistung_ps">PS: </Form.Label>
            <Form.Control
              type="text"
              name="leistung_ps"
              id="leistung_ps"
              value={this.state.car.leistung_ps}
              onChange={this.handleChange}
            />
            <Form.Label htmlFor="erstzulassung_monat">
              Erstzulassung Monat:{" "}
            </Form.Label>
            <Form.Control
              type="text"
              name="erstzulassung_monat"
              id="erstzulassung_monat"
              value={this.state.car.erstzulassung_monat}
              onChange={this.handleChange}
            />
            <Form.Label htmlFor="erstzulassung_jahr">
              Erstzulassung Jahr:{" "}
            </Form.Label>
            <Form.Control
              type="text"
              name="erstzulassung_jahr"
              id="erstzulassung_jahr"
              value={this.state.car.erstzulassung_jahr}
              onChange={this.handleChange}
            />
            <Form.Label htmlFor="kaufdatum">Kaufdatum: </Form.Label>
            <Form.Control
              type="text"
              name="kaufdatum"
              id="kaufdatum"
              value={this.state.car.kaufdaten.kaufdatum}
              onChange={this.handleChange}
            />
            <Form.Label htmlFor="kaufpreis">Kaufpreis: </Form.Label>
            <Form.Control
              type="text"
              name="kaufpreis"
              id="kaufpreis"
              value={this.state.car.kaufdaten.kaufpreis}
              onChange={this.handleChange}
            />
            <Form.Label htmlFor="laufleistung">Kilometerstand: </Form.Label>
            <Form.Control
              type="text"
              name="laufleistung"
              id="laufleistung"
              value={this.state.car.kaufdaten.laufleistung}
              onChange={this.handleChange}
            />
            <Form.Label htmlFor="bild">Bild: </Form.Label>
            <Form.Control
              type="file"
              name="bild"
              id="bild"
              value={this.state.car.bild}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Button type="submit">Speichern</Button>
        </Form>
      </div>
    );
  }
}

export default AddCar;
