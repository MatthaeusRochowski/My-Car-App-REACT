import React, { Component } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

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
      editActive: !this.state.editActive
    });
  };

  handleChange = event => {
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
        //console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    //console.log("CarDetails -----> rendered");
    //console.log("CarDetails ----> props: ", this.props);
    //console.log("CarDetails ----> state: ", this.state);

    return (
      <div>
        <div className="car-details">
          <div className="car-details-form">
            <Button onClick={this.toggleEdit}>Fahrzeugdaten ändern</Button>
            
            <div>
              <form onSubmit={this.handleSubmit}>
                <div className="car-img-div">
                  <img
                    src={this.state.bild}
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
                      value={this.state.kennzeichen}
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
                      value={this.state.hersteller}
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
                      value={this.state.modell}
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
                      value={this.state.erstzulassung_monat}
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
                      value={this.state.erstzulassung_jahr}
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
                      value={this.state.kraftstoff}
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
                        this.state.verbrauch === undefined
                          ? ""
                          : this.state.verbrauch
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
                      value={this.state.leistung_ps}
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
                      value={this.state.kilometerstand}
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
                      value={this.state.kaufdatum || ""}
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
                      value={this.state.kaufpreis}
                      onChange={this.handleChange}
                    />
                  </span>
                </p>
                <p className="p-class">
                  <span>Kilometerstand bei Kauf:</span>
                  <span>
                    <input
                      type="text"
                      name="kilometerstand_bei_kauf"
                      id="kilometerstand_bei_kauf"
                      value={this.state.kilometerstand_bei_kauf}
                      onChange={this.handleChange}
                    />
                  </span>
                </p>

                {this.state.editActive &&
                <Button type="submit">Speichern</Button>}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}