import React, { Component } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

class AddCar extends Component {
  state = {
    eigner_ref: "",
    kennzeichen: "",
    hersteller: "",
    modell: "",
    kraftstoff: "",
    leistung_ps: "",
    erstzulassung_monat: "",
    erstzulassung_jahr: "",
    kaufdaten: {
      kaufdatum: "",
      kaufpreis: "",
      kilometerstand: ""
    },
    kilometerstand: "",
    bild: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log("SUBMIT");

    axios
      .post("/api/myCars", {
        title: this.state.title,
        description: this.state.description
      })
      .then(response => {
        this.props.getData();
        this.setState({
          eigner_ref: "",
          kennzeichen: "",
          hersteller: "",
          modell: "",
          kraftstoff: "",
          leistung_ps: "",
          erstzulassung_monat: "",
          erstzulassung_jahr: "",
          kaufdaten: {
            kaufdatum: "",
            kaufpreis: "",
            kilometerstand: ""
          },
          kilometerstand: this.state.kaufdaten.kilometerstand,
          bild: ""
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    console.log("AddCar -----> rendered");

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Label htmlFor="kennzeichen">Kennzeichen: </Form.Label>
          <Form.Control
            type="text"
            name="kennzeichen"
            id="kennzeichen"
            onChange={this.handleChange}
            value={this.state.title}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="hersteller">Hersteller: </Form.Label>
          <Form.Control
            type="text"
            name="hersteller"
            id="hersteller"
            onChange={this.handleChange}
            value={this.state.description}
          />

          <Form.Label htmlFor="modell">Modell: </Form.Label>
          <Form.Control
            type="text"
            name="modell"
            id="modell"
            onChange={this.handleChange}
            value={this.state.description}
          />
          <Form.Label htmlFor="kraftstoff">Kraftstoff: </Form.Label>
          <Form.Control
            type="text"
            name="kraftstoff"
            id="kraftstoff"
            onChange={this.handleChange}
            value={this.state.description}
          />
          <Form.Label htmlFor="leistung_ps">PS: </Form.Label>
          <Form.Control
            type="text"
            name="leistung_ps"
            id="leistung_ps"
            onChange={this.handleChange}
            value={this.state.description}
          />
          <Form.Label htmlFor="erstzulassung_monat">Erstzulassung Monat: </Form.Label>
          <Form.Control
            type="text"
            name="erstzulassung_monat"
            id="erstzulassung_monat"
            onChange={this.handleChange}
            value={this.state.description}
          />
          <Form.Label htmlFor="erstzulassung_jahr">Erstzulassung Jahr: </Form.Label>
          <Form.Control
            type="text"
            name="erstzulassung_jahr"
            id="erstzulassung_jahr"
            onChange={this.handleChange}
            value={this.state.description}
          />
          <Form.Label htmlFor="kaufdatum">Kaufdatum: </Form.Label>
          <Form.Control
            type="text"
            name="kaufdatum"
            id="kaufdatum"
            onChange={this.handleChange}
            value={this.state.description}
          />
          <Form.Label htmlFor="kaufpreis">Kaufpreis: </Form.Label>
          <Form.Control
            type="text"
            name="kaufpreis"
            id="kaufpreis"
            onChange={this.handleChange}
            value={this.state.description}
          />
          <Form.Label htmlFor="kilometerstand">Kilometerstand: </Form.Label>
          <Form.Control
            type="text"
            name="kilometerstand"
            id="kilometerstand"
            onChange={this.handleChange}
            value={this.state.description}
          />
          <Form.Label htmlFor="bild">Bild: </Form.Label>
          <Form.Control
            type="text"
            name="bild"
            id="bild"
            onChange={this.handleChange}
            value={this.state.description}
          />
        </Form.Group>

        <Button type="submit">Speichern</Button>
      </Form>
    );
  }
}

export default AddCar;
