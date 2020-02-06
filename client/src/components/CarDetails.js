import React, { Component } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import Logbook from "./Logbook";
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import { MDBInput } from 'mdbreact';


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
    //console.log("Change handler", event);
    console.log("active? ", this.state.editActive);

    let { name, value } = event.target;
    console.log(name + " " + value);

    if (this.state.editActive) {
      console.log("edit active");
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
    }
  };

  deleteCar = () => {
    const id = this.props.match.params.id;

    axios
      .delete(`/api/myCars/${id}`)
      .then(response => {
        // redirect to '/projects'
        console.log(this.props.history);
        this.props.history.push("/myCars");
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleSubmit = event => {
    console.log("handle submit", this.state.car);
    event.preventDefault();
    const id = this.props.match.params.id;
    axios
      .put(`/api/myCars/${id}`, {
        car: this.state.car
      })
      .then(response => {
        console.log("carEditResp: ", response);
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
    console.log("CarDetails -----> rendered");
    console.log("state: ", this.state.car);

    return (
      <div>
        <h2>Fahrzeug Details für {this.state.car.kennzeichen}</h2>
        <div className="car-details">
          <div className="car-details-form">
            <Button onClick={this.toggleEdit}>Fahrzeugdaten ändern</Button>
            <Button variant="danger" onClick={this.deleteCar}>
              Fahrzeug löschen
            </Button>
            <div>
              <form onSubmit={this.handleSubmit}>
                <div className="car-img-div">
                  <img
                    src={this.state.car.bild}
                    className="car-image"
                    alt="Autobild"
                  />
                </div>
                <p className="p-class">
                  <span>Kennzeichen:</span>
                  <span>
                    <input
                      type="text"
                      name="kennzeichen"
                      id="kennzeichen"
                      value={this.state.car.kennzeichen}
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
                      value={this.state.car.hersteller}
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
                      value={this.state.car.modell}
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
                      value={this.state.car.erstzulassung_monat}
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
                      value={this.state.car.erstzulassung_jahr}
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
                      value={this.state.car.kraftstoff}
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
                      value={
                        this.state.car.verbrauch === undefined
                          ? ""
                          : this.state.car.verbrauch
                      }
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
                      value={this.state.car.leistung_ps}
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
                      value={this.state.car.kilometerstand}
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
                      value={this.state.car.kaufdaten.kaufdatum || ""}
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
                      value={this.state.car.kaufdaten.kaufpreis}
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
                      value={this.state.car.kaufdaten.laufleistung}
                      onChange={this.handleChange}
                    />
                  </span>
                </p>

                <Button type="submit">Edit</Button>
              </form>
            </div>
          </div>

          <div className="car-details-logbook">
            <Card>
              <Card.Header>
                <Nav variant="tabs" defaultActiveKey='#logbuch'>
                  <Nav.Item>
                    <Nav.Link href='#logbuch'>Logbuch</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href='#rechnungen'>Rechnungen</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href='#kosten'>Kostenauswertung</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Header>
            </Card>
            <Logbook />
          </div>
        </div>
      </div>
    );
  }
}
