import React, { Component } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const datum = new Date();
const heute =
  datum.getFullYear() + "-" + (datum.getMonth() + 1) + "-" + datum.getDate();

class AddLog extends Component {
  state = {
    car_kennzeichen: "",
    car_ref: this.props.match.params.id,
    datum: heute,
    strecke_km: "",
    startort: "",
    zielort: "",
    kilometerstand_start: "",
    kilometerstand_ende: "",

    error: ""
  };

  getData = () => {
    const id = this.props.match.params.id;

    axios
      .get(`/api/myCars/${id}`)
      .then(response => {
        console.log("Axios Call ----> Get Data executed", response.data);
        this.setState({
          kilometerstand_start: response.data.kilometerstand,
          car_kennzeichen: response.data.kennzeichen
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

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    console.log("AddLog -----> Submitted");
    console.log("AddLog -----> State: ", this.state);
    event.preventDefault();
/*     const strecke =
      this.state.kilometerstand_ende - this.state.kilometerstand_start; */

    axios
      .post(`/api/logbook`, {
        car_ref: this.state.car_ref,
        datum: this.state.datum,
        strecke_km: this.state.strecke_km,
        startort: this.state.startort,
        zielort: this.state.zielort,
        kilometerstand_start: this.state.kilometerstand_start,
        kilometerstand_ende: this.state.kilometerstand_ende
      })
      .then(response => {
        console.log("AddLog -----> New log created --> Response:", response);
        this.props.history.push("/myCars");
      })
      .catch(err => {
        this.setState({
          error: err.response.data.message
      });
      console.log(this.state.error);
    })
  };

  render() {
    console.log("AddLog -----> rendered");
    console.log("AddLog Props: ", this.props);
    console.log("AddLog State: ", this.state);

    return (
      <div>
        <h3>Logbuch Eintrag für {this.state.car_kennzeichen}</h3>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor="datum">Datum: </Form.Label>
            <Form.Control
              type="text"
              name="datum"
              id="datum"
              value={this.state.datum}
              onChange={this.handleChange}
            />
            <Form.Label htmlFor="startort">Von: </Form.Label>
            <Form.Control
              type="text"
              name="startort"
              id="startort"
              onChange={this.handleChange}
            />
            <Form.Label htmlFor="zielort">Nach: </Form.Label>
            <Form.Control
              type="text"
              name="zielort"
              id="zielort"
              onChange={this.handleChange}
            />
            <Form.Label htmlFor="kilometerstand_start">Km Start: </Form.Label>
            <Form.Control
              type="text"
              name="kilometerstand_start"
              id="kilometerstand_start"
              value={this.state.kilometerstand_start}
              onChange={this.handleChange}
            />
            <Form.Label htmlFor="kilometerstand_ende">Km Ende: </Form.Label>
            <Form.Control
              type="text"
              name="kilometerstand_ende"
              id="kilometerstand_ende"
              onChange={this.handleChange}
            />
            <Form.Label htmlFor="strecke_km">Strecke: </Form.Label>
            <Form.Control
              type="text"
              name="strecke_km"
              id="strecke_km"
              value={this.state.strecke_km}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Button type="submit">Speichern</Button>
        </Form>
      </div>
    );
  }
}

export default AddLog;
