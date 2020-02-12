import React, { Component } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const datum = new Date();
const heute =
  datum.getFullYear() + "-" + (datum.getMonth() + 1) + "-" + datum.getDate();

class AddInvoice extends Component {
  state = {
    car_kennzeichen: "",
    datum: heute,
    kilometerstand: "",
    rechnungstyp: "Tanken",
    betrag: "",

    error: ""
  };

  getData = () => {
    const id = this.props.match.params.id;

    axios
      .get(`/api/myCars/${id}`)
      .then(response => {
        //console.log("Axios Call ----> Get Data executed", response.data);
        this.setState({
          kilometerstand: response.data.kilometerstand,
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
    //console.log("AddLog -----> Submitted");
    //console.log("AddLog -----> State: ", this.state);
    const id = this.props.match.params.id;
    event.preventDefault();

    axios
      .post(`/api/myCars/invoice/${id}`, {
        datum: this.state.datum,
        kilometerstand: this.state.kilometerstand,
        rechnungstyp: this.state.rechnungstyp,
        betrag: this.state.betrag
      })
      .then(response => {
        //console.log("AddInvoice -----> New log created --> Response:", response);
        this.props.history.push("/myCars");
      })
      .catch(err => {
        this.setState({
          error: err.response.data.message
        });
        console.log(this.state.error);
      });
  };

  render() {
    //console.log("AddInvoice -----> rendered");
    //console.log("AddInvoice Props: ", this.props);
    console.log("AddInvoice State: ", this.state);

    return (
      <div>
        <h3>Neue Rechnung für {this.state.car_kennzeichen}</h3>
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
            <Form.Label htmlFor="kilometerstand">Kilometerstand: </Form.Label>
            <Form.Control
              type="text"
              name="kilometerstand"
              id="kilometerstand"
              value={this.state.kilometerstand}
              onChange={this.handleChange}
            />
            <Form.Label htmlFor="rechnungstyp">Rechnungstyp: </Form.Label>
            <Form.Control as="select" name="rechnungstyp" onChange={this.handleChange}>
              <option>Tanken</option>
              <option>Werkstatt</option>
              <option>Versicherung</option>
              <option>Steuer</option>
              <option>Wertverlust</option>
            </Form.Control>

            <Form.Label htmlFor="betrag">Betrag: </Form.Label>
            <Form.Control
              type="text"
              name="betrag"
              id="betrag"
              value={this.state.betrag}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Button variant="info" type="submit">Speichern</Button>
        </Form>
      </div>
    );
  }
}

export default AddInvoice;
