import React, { Component } from "react";
import axios from "axios";
import { Form, Button, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const datum = new Date();
const heute = datum.getDate() + "-" + (datum.getMonth() + 1) + "-" + datum.getFullYear();

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

  onDateChange = (date) => {
    this.setState({ 
      datum: (String(date.getDate()).padStart(2, '0') + "-" + String(date.getMonth() + 1).padStart(2, '0') + "-" + date.getFullYear())
    })
    console.log('Picked Datum: ', date);
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
            <Form.Row>
              <Col>
                <Form.Label htmlFor="datum">Datum: </Form.Label>
                <DatePicker
                  id='date_pick_invoiceAdd'
                  onChange={this.onDateChange}
                  value={this.state.datum}
                  disabled={false}
                />
              </Col>      
            </Form.Row>
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
