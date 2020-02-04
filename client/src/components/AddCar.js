import React, { Component } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

class AddCar extends Component {
  state = {
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
      kilometerstand: ""
    },
    kilometerstand: "",
    bild: ""
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value});
    //this.setState({
   //   [event.target.name]: event.target.value
  //  });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log("SUBMIT");

    const {kennzeichen, verbrauch, hersteller, modell, kraftstoff, leistung_ps,
    erstzulassung_jahr, erstzulassung_monat, kaufdaten, 
  kilometerstand, bild, eigner_ref} = this.state;

  //console.log("handle submit ----> state", this.state)

  //console.log("handle submit ----> eigner_ref", this.state.eigner_ref)

  axios
      .post("/api/myCars", {
        verbrauch, kennzeichen, hersteller, modell, kraftstoff,
        leistung_ps, erstzulassung_jahr, erstzulassung_monat,
        kaufdaten, kilometerstand, bild, eigner_ref
      })
      .then(() => {
        this.props.history.push("/myCars");
      })
      .catch(err => {
        console.log(err);
      });
    };
   /* axios
      .post("/api/myCars", {
        eigner_ref: this.state.eigner_ref,
        kennzeichen: this.state.kennzeichen,
        hersteller: this.state.hersteller,
        modell: this.state.modell,
        kraftstoff: this.state.kraftstoff,
        leistung_ps: this.state.leistung_ps,
        erstzulassung_jahr: this.state.erstzulassung_jahr,
        erstzulassung_monat: this.state.erstzulassung_monat,
        kaufdaten: {
          kaufdatum: this.state.kaufdatum,
          kaufpreis: this.state.kaufpreis,
          kilometerstand: this.state.kilometerstand
        },
        kilometerstand: this.state.kaufdaten.kilometerstand,
        //bild: this.state.bild
      })
      .then(response => {
        /*this.props.getData();
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
  }; */

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
            value={this.state.kennzeichen}
            onChange={this.handleChange}
            
          />
          <Form.Label htmlFor="hersteller">Hersteller: </Form.Label>
          <Form.Control
            type="text"
            name="hersteller"
            id="hersteller"
            value={this.state.hersteller}
            onChange={this.handleChange}
            
          />
          <Form.Label htmlFor="modell">Modell: </Form.Label>
          <Form.Control
            type="text"
            name="modell"
            id="modell"
            value={this.state.modell}
            onChange={this.handleChange}
            
          />
          <Form.Label htmlFor="kraftstoff">Kraftstoff: </Form.Label>
          <Form.Control
            type="text"
            name="kraftstoff"
            id="kraftstoff"
            value={this.state.kraftstoff}
            onChange={this.handleChange}
            
          />
          <Form.Label htmlFor="verbrauch">Verbrauch: </Form.Label>
          <Form.Control
            type="text"
            name="verbrauch"
            id="verbrauch"
            value={this.state.verbrauch}
            onChange={this.handleChange}
            
          />
          <Form.Label htmlFor="leistung_ps">PS: </Form.Label>
          <Form.Control
            type="text"
            name="leistung_ps"
            id="leistung_ps"
            value={this.state.leistung_ps}
            onChange={this.handleChange}
            
          />
          <Form.Label htmlFor="erstzulassung_monat">Erstzulassung Monat: </Form.Label>
          <Form.Control
            type="text"
            name="erstzulassung_monat"
            id="erstzulassung_monat"
            value={this.state.erstzulassung_monat}
            onChange={this.handleChange}
            
          />
          <Form.Label htmlFor="erstzulassung_jahr">Erstzulassung Jahr: </Form.Label>
          <Form.Control
            type="text"
            name="erstzulassung_jahr"
            id="erstzulassung_jahr"
            value={this.state.erstzulassung_jahr}
            onChange={this.handleChange}
            
          />
          <Form.Label htmlFor="kaufdatum">Kaufdatum: </Form.Label>
          <Form.Control
            type="text"
            name="kaufdatum"
            id="kaufdatum"
            value={this.state.kaufdatum}
            onChange={this.handleChange}
            
          />
          <Form.Label htmlFor="kaufpreis">Kaufpreis: </Form.Label>
          <Form.Control
            type="text"
            name="kaufpreis"
            id="kaufpreis"
            value={this.state.kaufpreis}
            onChange={this.handleChange}
            
          />
          <Form.Label htmlFor="kilometerstand">Kilometerstand: </Form.Label>
          <Form.Control
            type="text"
            name="kilometerstand"
            id="kilometerstand"
            value={this.state.kilometerstand}
            onChange={this.handleChange}
            
          />
          <Form.Label htmlFor="bild">Bild: </Form.Label>
          <Form.Control
            type="file"
            name="bild"
            id="bild"
            value={this.state.bild}
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
