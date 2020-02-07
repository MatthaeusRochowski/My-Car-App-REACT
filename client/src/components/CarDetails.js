import React, { Component } from "react";
import axios from "axios";
import { Button, Form, Table } from "react-bootstrap";
import Logbook from "./Logbook";
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';



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

          <div className="overview">
            <div>
            <form className="tableOutline" onSubmit={this.handleSubmit}>
              <img
                src={this.state.car.bild}
                className="carImage"
                alt="Autobild"
              />
              <Table responsive="sm">
                <tbody>
                  <tr className="tableBox">
                    <td className="tableRowName">Kennzeichen:</td>
                    <td><input
                      className="tableRowValue"
                      type="text"
                      name="kennzeichen"
                      value={this.state.car.kennzeichen}
                      onChange={this.handleChange}
                    /></td>
                  </tr>
                  <tr className="tableBox">
                    <td className="tableRowName">Hersteller:</td>
                    <td><input
                      className="tableRowValue"
                      type="text"
                      name="hersteller"
                      value={this.state.car.hersteller}
                      onChange={this.handleChange}
                    /></td>
                  </tr>
                  <tr className="tableBox">
                    <td className="tableRowName">Modell:</td>
                    <td><input
                      className="tableRowValue"
                      type="text"
                      name="modell"
                      value={this.state.car.modell}
                      onChange={this.handleChange}
                    /></td>
                  </tr>
                  <tr className="tableBox">
                    <td className="tableRowName">Erstzulassung Monat:</td>
                    <td><input
                      className="tableRowValue"
                      type="text"
                      name="erstzulassung_monat"
                      value={this.state.car.erstzulassung_monat}
                      onChange={this.handleChange}
                    /></td>
                  </tr>
                  <tr className="tableBox">
                    <td className="tableRowName">Erstzulassung Jahr:</td>
                    <td><input
                      className="tableRowValue"
                      type="text"
                      name="erstzulassung_jahr"
                      value={this.state.car.erstzulassung_jahr}
                      onChange={this.handleChange}
                    /></td>
                  </tr>
                  <tr className="tableBox">
                    <td className="tableRowName">Kraftstoff:</td>
                    <td><input
                      className="tableRowValue"
                      type="text"
                      name="kraftstoff"
                      value={this.state.car.kraftstoff}
                      onChange={this.handleChange}
                    /></td>
                  </tr>
                  <tr className="tableBox">
                    <td className="tableRowName">Verbrauch:</td>
                    <td><input
                      className="tableRowValue"
                      type="text"
                      name="verbrauch"
                      value={
                        this.state.car.verbrauch === undefined
                          ? ""
                          : this.state.car.verbrauch
                      }
                      onChange={this.handleChange}
                    /></td>
                  </tr>
                  <tr className="tableBox">
                    <td className="tableRowName">Leistung:</td>
                    <td><input
                      className="tableRowValue"
                      type="text"
                      name="leistung_ps"
                      value={this.state.car.leistung_ps}
                      onChange={this.handleChange}
                    /></td>
                  </tr>
                  <tr className="tableBox">
                    <td className="tableRowName">Kilometerstand:</td>
                    <td><input
                      className="tableRowValue"
                      type="text"
                      name="kilometerstand"
                      value={this.state.car.kilometerstand}
                      onChange={this.handleChange}
                    /></td>
                  </tr>
                  <tr className="tableBox">
                    <td className="tableRowName">Kaufdatum:</td>
                    <td><input
                      className="tableRowValue"
                      type="text"
                      name="kaufdatum"
                      value={this.state.car.kaufdaten.kaufdatum || ""}
                      onChange={this.handleChange}
                    /></td>
                  </tr>
                  <tr className="tableBox">
                    <td className="tableRowName">Kaufpreis:</td>
                    <td><input
                      className="tableRowValue"
                      type="text"
                      name="kaufpreis"
                      value={this.state.car.kaufdaten.kaufpreis}
                      onChange={this.handleChange}
                    /></td>
                  </tr>
                  <tr className="tableBox">
                    <td className="tableRowName">Kilometerstand bei Kauf:</td>
                    <td><input
                      className="tableRowValue"
                      type="text"
                      name="laufleistung"
                      value={this.state.car.kaufdaten.laufleistung}
                      onChange={this.handleChange}
                    /></td>
                  </tr>
                </tbody>             
              </Table>
              <Button type="submit">Änderungen übernehmen</Button> 
              <Button type="reset" class="btn btn-default pull-right">Abbrechen</Button>
            </form>
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

        </div>
      </div>
    );
  }
}
