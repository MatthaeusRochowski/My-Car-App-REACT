import React, { Component } from "react";
import axios from "axios";
import { Form, Button, Col } from "react-bootstrap";
import service from "../services/upload.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import { manufacturer } from '../services/manufacturer';

const options = manufacturer();

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
      bild: "",
      publicId: ""
    },
    file: "",
    error: ""
  };

  onHerstellerChange = (selectedHersteller) => {
    let carCopy = this.state.car;
    carCopy.hersteller = selectedHersteller.value
    this.setState({ car: carCopy });
    console.log('Selected Hersteller: ', selectedHersteller.value);
  };

  onKaufdatumChange = (date) => {
    let kaufdatenCopy = this.state.car.kaufdaten;
    kaufdatenCopy.kaufdatum = (String(date.getDate()).padStart(2, '0') + "-" + String(date.getMonth() + 1).padStart(2, '0') + "-" + date.getFullYear());
    this.setState({ 
      kaufdatum: (String(date.getDate()).padStart(2, '0') + "-" + String(date.getMonth() + 1).padStart(2, '0') + "-" + date.getFullYear())
    })
    console.log('Picked Kaufdatum: ', date);
    console.log('updated kaufdaten: ', this.state.car.kaufdaten)
  }

  handleChange = event => {
    let { name, value } = event.target;
    //console.log(name + " " + value);

    let carCopy = this.state.car;
    let kaufdatenCopy = this.state.car.kaufdaten;

    if (kaufdatenCopy.hasOwnProperty(name)) {
      console.log("in kaufdaten");
      kaufdatenCopy[name] = value;
      this.setState({
        kaufdaten: kaufdatenCopy
      });
    } else if (carCopy.hasOwnProperty(name)) {
      console.log("in car");
      carCopy[name] = value;
      this.setState({
        car: carCopy
      });
    }
  };

  handleFileSelect = event => {
    this.setState({ file: event.target.files[0] });
  };

  handleSubmit = async event => {
    console.log("Submit Button pressed");

    if (event) {
      event.preventDefault();
    }

    console.log("The file to be uploaded is: ", this.state.file);
    const uploadData = new FormData();
    uploadData.append("file", this.state.file);

    try {
      const cloudinaryResponse = await service.handleUpload(uploadData);
      const bild = cloudinaryResponse.secure_url;
      const publicId = cloudinaryResponse.public_id;

      const carCopy = this.state.car;

      carCopy.bild = bild;
      carCopy.publicId = publicId;

      this.setState({ car: carCopy });
    } catch (err) {
      this.setState({ error: err });
      console.log("Error", this.state.error);
    }

    try {
      const response = await axios.post("/api/myCars", {
        car: this.state.car
      });
      this.props.history.push("/myCars");
    } catch (err) {
      this.setState({ error: err });
      console.log("Error", this.state.error);
    }
  };

  render() {
    console.log("AddCar -----> rendered");
    console.log("AddCar props: ", this.props.user);
    console.log("State: ", this.state);

    return (
      <div className="carAddPage">
        <h3>Füge dein neues Auto hinzu:</h3>
      <div className="addFormInput">
        <Form onSubmit={this.handleSubmit}>
         {/* <Form.Group> */}
            <Form.Row>
              <Col>
            <Form.Control className="formInput"
              type="text"
              name="kennzeichen"
              placeholder="Kennzeichen"
              value={this.state.car.kennzeichen}
              onChange={this.handleChange}
            />
            </Col>
            <Col>
              <div id='addCar_manufacturer'>
                <Select
                  name='hersteller'
                  value={this.state.car.hersteller}
                  placeholder={this.state.car.hersteller}
                  onChange={this.onHerstellerChange}
                  options={options}
                  isDisabled={false}
                  isSearchable={true}
                  isRtl={true}
                />
              </div>
            </Col>
            </Form.Row>
            <Form.Row>
              <Col>
            <Form.Control className="formInput"
              type="text"
              name="modell"
              placeholder="Modell"
              value={this.state.car.modell}
              onChange={this.handleChange}
            />
            </Col>
            <Col>
            <Form.Control className="formInput"
              type="text"
              name="kraftstoff"
              placeholder="Kraftstoff"
              value={this.state.car.kraftstoff}
              onChange={this.handleChange}
            />
            </Col>
            </Form.Row>
            <Form.Row>
              <Col>
            <Form.Control className="formInput"
              type="text"
              name="verbrauch"
              placeholder="Verbrauch l/100km"
              value={this.state.car.verbrauch}
              onChange={this.handleChange}
            />
            </Col>
            <Col>
            <Form.Control className="formInput"
              type="text"
              name="leistung_ps"
              placeholder="PS"
              value={this.state.car.leistung_ps}
              onChange={this.handleChange}
            />
            </Col>
            </Form.Row>
            <Form.Row>
              <Col>
            <Form.Control className="formInput"
              type="text"
              name="erstzulassung_monat"
              placeholder="Erstzulassung Monat"
              value={this.state.car.erstzulassung_monat}
              onChange={this.handleChange}
            />
            </Col>
            <Col>
            <Form.Control className="formInput"
              type="text"
              name="erstzulassung_jahr"
              placeholder="Erstzulassung Jahr"
              value={this.state.car.erstzulassung_jahr}
              onChange={this.handleChange}
            />
            </Col>
            </Form.Row>
            <Form.Row>
            <Col>
              <DatePicker
                id='date_pick_carAdd'
                onChange={this.onKaufdatumChange}
                value={this.state.car.kaufdaten.kaufdatum}
                disabled={false}
              />
            </Col>
            </Form.Row>
            <Form.Row>
              <Col>
            <Form.Control className="formInput"
              type="text"
              name="kaufpreis"
              placeholder="Kaufpreis"
              value={this.state.car.kaufdaten.kaufpreis}
              onChange={this.handleChange}
            />
            </Col>
            <Col>
            <Form.Control className="formInput"
              type="text"
              name="laufleistung"
              placeholder="Kilometerstand"
              value={this.state.car.kaufdaten.laufleistung}
              onChange={this.handleChange}
            />
             </Col>
            </Form.Row>
            <Form.Control className="formInput"
              type="file"
              name="bild"
              onChange={this.handleFileSelect}
            />
         {/* </Form.Group>*/}
            <Button variant="info" type="submit">Speichern</Button>
        </Form>
      </div>
      </div>
    );
  }
}

export default AddCar;