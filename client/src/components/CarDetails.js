import React, { Component } from "react";
import axios from "axios";
import { Button, Table } from "react-bootstrap";

export default class CarDetails extends Component {
  state = {
    kennzeichen: "",
    hersteller: "",
    modell: "",
    kraftstoff: "",
    verbrauch: "",
    leistung_ps: "",
    erstzulassung_monat: "",
    erstzulassung_jahr: "",
    kaufdatum: "",
    kaufpreis: "",
    kilometerstand_bei_kauf: "",
    kilometerstand: "",
    bild: "",

    editActive: false,

    error: ""
  };

  getData = () => {
    axios
      .get(`/api/myCars/${this.props.carId}`)
      .then(response => {
        console.log("CarDetails -----> Axios Call ----> Get Data", response);
        this.setState({
          kennzeichen: response.data.kennzeichen,
          hersteller: response.data.hersteller,
          modell: response.data.modell,
          kraftstoff: response.data.kraftstoff,
          verbrauch: response.data.verbrauch,
          leistung_ps: response.data.leistung_ps,
          erstzulassung_monat: response.data.erstzulassung_monat,
          erstzulassung_jahr: response.data.erstzulassung_jahr,
          kaufdatum: response.data.kaufdaten.kaufdatum,
          kaufpreis: response.data.kaufdaten.kaufpreis,
          kilometerstand_bei_kauf: response.data.kaufdaten.laufleistung,
          kilometerstand: response.data.kilometerstand,
          bild: response.data.bild
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
      oldState: this.state,
      editActive: !this.state.editActive
    });
  };

  handleChange = event => {
    console.log("Inside Car Details Change:", event)
    if (this.state.editActive) {
      const { name, value } = event.target;
      this.setState({ [name]: value });
    }
  };

  handleSubmit = event => {
    console.log("CarDetails -> CarEdit ----> submitted");
    event.preventDefault();

    axios
      .put(`/api/myCars/${this.props.carId}`, {
        kennzeichen: this.state.kennzeichen,
        hersteller: this.state.hersteller,
        modell: this.state.modell,
        kraftstoff: this.state.kraftstoff,
        verbrauch: this.state.verbrauch,
        leistung_ps: this.state.leistung_ps,
        erstzulassung_monat: this.state.erstzulassung_monat,
        erstzulassung_jahr: this.state.erstzulassung_jahr,
        kaufdatum: this.state.kaufdatum,
        kaufpreis: this.state.kaufpreis,
        kilometerstand_bei_kauf: this.state.kilometerstand_bei_kauf,
        kilometerstand: this.state.kilometerstand
      })
      .then(response => {
        console.log("Car Edit Response: ", response);
        this.setState({
          editActive: false
        });
        delete this.state.oldState
        //console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleCancel = event => {
   this.setState(
     this.state.oldState
   )
   delete this.state.oldState
  }

  render() {
    //console.log("CarDetails -----> rendered");
    //console.log("CarDetails ----> props: ", this.props);
    //console.log("CarDetails ----> state: ", this.state);

    return (
      <div>
        <div className="car-details">
          <div className="car-details-form">
            <Button onClick={this.toggleEdit}>Fahrzeugdaten ändern</Button>
            <Button variant="danger" onClick={this.props.deleteHandler}>Fahrzeug löschen</Button>

            <div className="overview">
              <div>
                <form className="tableOutline" onSubmit={this.handleSubmit}>
                  <img
                    src={this.state.bild}
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
                          value={this.state.kennzeichen}
                          onChange={this.handleChange}
                        /></td>
                      </tr>
                      <tr className="tableBox">
                        <td className="tableRowName">Hersteller:</td>
                        <td><input
                          className="tableRowValue"
                          type="text"
                          name="hersteller"
                          value={this.state.hersteller}
                          onChange={this.handleChange}
                        /></td>
                      </tr>
                      <tr className="tableBox">
                        <td className="tableRowName">Modell:</td>
                        <td><input
                          className="tableRowValue"
                          type="text"
                          name="modell"
                          value={this.state.modell}
                          onChange={this.handleChange}
                        /></td>
                      </tr>
                      <tr className="tableBox">
                        <td className="tableRowName">Erstzulassung Monat:</td>
                        <td><input
                          className="tableRowValue"
                          type="text"
                          name="erstzulassung_monat"
                          value={this.state.erstzulassung_monat}
                          onChange={this.handleChange}
                        /></td>
                      </tr>
                      <tr className="tableBox">
                        <td className="tableRowName">Erstzulassung Jahr:</td>
                        <td><input
                          className="tableRowValue"
                          type="text"
                          name="erstzulassung_jahr"
                          value={this.state.erstzulassung_jahr}
                          onChange={this.handleChange}
                        /></td>
                      </tr>
                      <tr className="tableBox">
                        <td className="tableRowName">Kraftstoff:</td>
                        <td><input
                          className="tableRowValue"
                          type="text"
                          name="kraftstoff"
                          value={this.state.kraftstoff}
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
                            this.state.verbrauch === undefined
                              ? ""
                              : this.state.verbrauch
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
                          value={this.state.leistung_ps}
                          onChange={this.handleChange}
                        /></td>
                      </tr>
                      <tr className="tableBox">
                        <td className="tableRowName">Kilometerstand:</td>
                        <td><input
                          className="tableRowValue"
                          type="text"
                          name="kilometerstand"
                          value={this.state.kilometerstand}
                          onChange={this.handleChange}
                        /></td>
                      </tr>
                      <tr className="tableBox">
                        <td className="tableRowName">Kaufdatum:</td>
                        <td><input
                          className="tableRowValue"
                          type="text"
                          name="kaufdatum"
                          value={this.state.kaufdatum || ""}
                          onChange={this.handleChange}
                        /></td>
                      </tr>
                      <tr className="tableBox">
                        <td className="tableRowName">Kaufpreis:</td>
                        <td><input
                          className="tableRowValue"
                          type="text"
                          name="kaufpreis"
                          value={this.state.kaufpreis}
                          onChange={this.handleChange}
                        /></td>
                      </tr>
                      <tr className="tableBox">
                        <td className="tableRowName">Kilometerstand bei Kauf:</td>
                        <td><input
                          className="tableRowValue"
                          type="text"
                          name="kilometerstand_bei_kauf"
                          value={this.state.kilometerstand_bei_kauf}
                          onChange={this.handleChange}
                        /></td>
                      </tr>
                    </tbody>
                  </Table>
                  {this.state.editActive &&
                    <Button type="submit">Änderungen übernehmen</Button>}
                  {this.state.editActive &&
                    <Button type="reset" className="btn btn-default pull-right" onClick = {this.handleCancel}>Abbrechen</Button>}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}