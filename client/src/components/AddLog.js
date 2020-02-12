import React, { Component } from "react";
import axios from "axios";
import { Form, Button, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const datum = new Date();
const heute = datum.getDate() + "-" + (datum.getMonth() + 1) + "-" + datum.getFullYear();

class AddLog extends Component {
  state = {
    car_kennzeichen: "",
    datum: heute,
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
        //console.log("Axios Call ----> Get Data executed", response.data);
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

  onDateChange = (date) => {
    this.setState({ 
      datum: (String(date.getDate()).padStart(2, '0') + "-" + String(date.getMonth() + 1).padStart(2, '0') + "-" + date.getFullYear())
    })
    console.log('Picked Datum: ', date);
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = event => {
    //console.log("AddLog -----> Submitted");
    //console.log("AddLog -----> State: ", this.state);
    const id = this.props.match.params.id
    const strecke = this.state.kilometerstand_ende - this.state.kilometerstand_start;
    event.preventDefault();

    axios
      .post(`/api/myCars/logbook/${id}`, {
        datum: this.state.datum,
        strecke_km: strecke,
        startort: this.state.startort,
        zielort: this.state.zielort,
        kilometerstand_start: this.state.kilometerstand_start,
        kilometerstand_ende: this.state.kilometerstand_ende
      })
      .then(response => {
        //console.log("AddLog -----> New log created --> Response:", response);
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
    //console.log("AddLog -----> rendered");
    //console.log("AddLog Props: ", this.props);
    console.log("AddLog State: ", this.state);

    return (
      <div>
        <h3>Logbuch Eintrag für {this.state.car_kennzeichen}</h3>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Row>
                <Col>
                  <Form.Label htmlFor="datum">Datum: </Form.Label><br/>
                  <DatePicker
                    id='date_pick_logAdd'
                    onChange={this.onDateChange}
                    value={this.state.datum}
                    disabled={false}
                  />
                </Col>      
              </Form.Row>
            <Form.Label htmlFor="startort">Von: </Form.Label>
            <Form.Control
              type="text"
              name="startort"
              className="formInput"
              onChange={this.handleChange}
            />
            <Form.Label htmlFor="zielort">Nach: </Form.Label>
            <Form.Control
              type="text"
              name="zielort"
              className="formInput"
              onChange={this.handleChange}
            />
            <Form.Label htmlFor="kilometerstand_start">Km Start: </Form.Label>
            <Form.Control
              type="text"
              name="kilometerstand_start"
              className="formInput"
              value={this.state.kilometerstand_start}
              onChange={this.handleChange}
            />
            <Form.Label htmlFor="kilometerstand_ende">Km Ende: </Form.Label>
            <Form.Control
              type="text"
              name="kilometerstand_ende"
              className="formInput"
              onChange={this.handleChange}
            />
          </Form.Group>

          <Button variant="info" type="submit">Speichern</Button>
        </Form>
      </div>
    );
  }
}

export default AddLog;
