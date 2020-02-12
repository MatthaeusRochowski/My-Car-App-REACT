import React, { Component } from "react";
import axios from "axios";
import { Button, Table } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
 
const options = [
  { value: 'Abarth', label: 'Abarth' },
  { value: 'AC', label: 'AC' },
  { value: 'Acura', label: 'Acura' },
  { value: 'Aixam', label: 'Aixam' },
  { value: 'Alfa Romeo', label: 'Alfa Romeo' },
  { value: 'ALPINA', label: 'ALPINA' },
  { value: 'Artega', label: 'Artega' },
  { value: 'Asia Motors', label: 'Asia Motors' },
  { value: 'Aston Martin', label: 'Aston Martin' },
  { value: 'Audi', label: 'Audi' },
  { value: 'Austin', label: 'Austin' },
  { value: 'Austin Healey', label: 'Austin Healey' },
  { value: 'Bentley', label: 'Bentley' },
  { value: 'BMW', label: 'BMW' },
  { value: 'Borgward', label: 'Borgward' },
  { value: 'Brilliance', label: 'Brilliance' },
  { value: 'Bugatti', label: 'Bugatti' },
  { value: 'Buick', label: 'Buick' },
  { value: 'Cadillac', label: 'Cadillac' },
  { value: 'Casalini', label: 'Casalini' },
  { value: 'Caterham', label: 'Caterham' },
  { value: 'Chatenet', label: 'Chatenet' },
  { value: 'Chevrolet', label: 'Chevrolet' },
  { value: 'Chrysler', label: 'Chrysler' },
  { value: 'Citroën', label: '' },
  { value: 'Cobra', label: 'Cobra' },
  { value: 'Corvette', label: 'Corvette' },
  { value: 'Cupra', label: 'Cupra' },
  { value: 'Dacia', label: 'Dacia' },
  { value: 'Daewoo', label: 'Daewoo' },
  { value: 'Daihatsu', label: 'Daihatsu' },
  { value: 'DeTomaso', label: 'DeTomaso' },
  { value: 'Dodge', label: 'Dodge' },
  { value: 'Donkervoort', label: 'Donkervoort' },
  { value: 'DS Automobiles', label: 'DS Automobiles' },
  { value: 'Ferrari', label: 'Ferrari' },
  { value: 'Fiat', label: 'Fiat' },
  { value: 'Fisker', label: 'Fisker' },
  { value: 'Ford', label: 'Ford' },
  { value: 'GAC Gonow', label: 'GAC Gonow' },
  { value: 'Gemballa', label: 'Gemballa' },
  { value: 'GMC', label: 'GMC' },
  { value: 'Grecav', label: 'Grecav' },
  { value: 'Hamann', label: 'Hamann' },
  { value: 'Holden', label: 'Holden' },
  { value: 'Honda', label: 'Honda' },
  { value: 'Hummer', label: 'Hummer' },
  { value: 'Hyundai', label: 'Hyundai' },
  { value: 'Infiniti', label: 'Infiniti' },
  { value: 'Isuzu', label: 'Isuzu' },
  { value: 'Iveco', label: 'Iveco' },
  { value: 'Jaguar', label: 'Jaguar' },
  { value: 'Jeep', label: 'Jeep' },
  { value: 'Kia', label: 'Kia' },
  { value: 'Koenigsegg', label: 'Koenigsegg' },
  { value: 'KTM', label: 'KTM' },
  { value: 'Lada', label: 'Lada' },
  { value: 'Lamborghini', label: 'Lamborghini' },
  { value: 'Lancia', label: 'Lancia' },
  { value: 'Land Rover', label: 'Land Rover' },
  { value: 'Landwind', label: 'Landwind' },
  { value: 'Lexus', label: 'Lexus' },
  { value: 'Ligier', label: 'Ligier' },
  { value: 'Lincoln', label: 'Lincoln' },
  { value: 'Lotus', label: 'Lotus' },
  { value: 'Mahindra', label: 'Mahindra' },
  { value: 'Maserati', label: 'Maserati' },
  { value: 'Maybach', label: 'Maybach' },
  { value: 'Mazda', label: 'Mazda' },
  { value: 'McLaren', label: 'McLaren' },
  { value: 'Mercedes-Benz', label: '' },
  { value: 'MG', label: 'MG' },
  { value: 'Microcar', label: 'Microcar' },
  { value: 'MINI', label: 'MINI' },
  { value: 'Mitsubishi', label: 'Mitsubishi' },
  { value: 'Morgan', label: 'Morgan' },
  { value: 'Nissan', label: 'Nissan' },
  { value: 'NSU', label: 'NSU' },
  { value: 'Oldsmobile', label: 'Oldsmobile' },
  { value: 'Opel', label: 'Opel' },
  { value: 'Pagani', label: 'Pagani' },
  { value: 'Peugeot', label: 'Peugeot' },
  { value: 'Piaggio', label: 'Piaggio' },
  { value: 'Plymouth', label: 'Plymouth' },
  { value: 'Polestar', label: 'Polestar' },
  { value: 'Pontiac', label: 'Pontiac' },
  { value: 'Porsche', label: 'Porsche' },
  { value: 'Proton', label: 'Proton' },
  { value: 'Renault', label: 'Renault' },
  { value: 'Rolls-Royce', label: '' },
  { value: 'Rover', label: 'Rover' },
  { value: 'Ruf', label: 'Ruf' },
  { value: 'Saab', label: 'Saab' },
  { value: 'Santana', label: 'Santana' },
  { value: 'Seat', label: 'Seat' },
  { value: 'Skoda', label: 'Skoda' },
  { value: 'Smart', label: 'Smart' },
  { value: 'speedART', label: 'speedART' },
  { value: 'Spyker', label: 'Spyker' },
  { value: 'Ssangyong', label: 'Ssangyong' },
  { value: 'Subaru', label: 'Subaru' },
  { value: 'Suzuki', label: 'Suzuki' },
  { value: 'Talbot', label: 'Talbot' },
  { value: 'Tata', label: 'Tata' },
  { value: 'TECHART', label: 'TECHART' },
  { value: 'Tesla', label: 'Tesla' },
  { value: 'Toyota', label: 'Toyota' },
  { value: 'Trabant', label: 'Trabant' },
  { value: 'Triumph', label: 'Triumph' },
  { value: 'TVR', label: 'TVR' },
  { value: 'Volkswagen', label: 'Volkswagen' },
  { value: 'Volvo', label: 'Volvo' },
  { value: 'Wartburg', label: 'Wartburg' },
  { value: 'Westfield', label: 'Westfield' },
  { value: 'Wiesmann', label: 'Wiesmann' },
  { value: 'Andere', label: 'Andere' },
];

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
    kaufdatum: this.props.kaufdatum,
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

  onHerstellerChange = (selectedHersteller) => {
    this.setState({ hersteller: selectedHersteller });
    console.log('Selected Hersteller: ', selectedHersteller);
  };

  onKaufdatumChange = (date) => {
    this.setState({ 
      kaufdatum: (String(date.getDate()).padStart(2, '0') + "-" + String(date.getMonth() + 1).padStart(2, '0') + "-" + date.getFullYear())
    })
    console.log('Picked Kaufdatum: ', date);
  }

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
            <Button variant="info" onClick={this.toggleEdit}>Fahrzeugdaten ändern</Button>
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
                        <td id='selectHersteller'>
                          <Select
                            name='hersteller'
                            value={this.state.hersteller}
                            onChange={this.onHerstellerChange}
                            options={options}
                            isDisabled={!this.state.editActive}
                            isSearchable={true}
                            isRtl={true}
                          />
                        </td>
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
                          value={this.state.kilometerstand || 0}
                          onChange={this.handleChange}
                        /></td>
                      </tr>
                      <tr className="tableBox">
                        <td className="tableRowName">Kaufdatum:</td>
                        <td style={{display: 'flex', flexDirection: 'row-reverse'}}>
                          <DatePicker
                            className='date_pick_carDetails'
                            onChange={this.onKaufdatumChange}
                            value={this.state.kaufdatum}
                            disabled={!this.state.editActive}
                          />
                        </td>
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
                          value={this.state.kilometerstand_bei_kauf || 0}
                          onChange={this.handleChange}
                        /></td>
                      </tr>
                    </tbody>
                  </Table>
                  {this.state.editActive &&
                    <Button variant="info" type="submit">Änderungen übernehmen</Button>}
                  {this.state.editActive &&
                    <Button variant="info" type="reset" className="btn btn-default pull-right" onClick = {this.handleCancel}>Abbrechen</Button>}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}