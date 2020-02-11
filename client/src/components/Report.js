import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";
import axios from "axios";

export default class Invoices extends Component {
  state = {
    invoices: [],
  };

  getData = () => {
    axios
      .get(`/api/myCars/${this.props.carId}`)
      .then(response => {
        console.log("Invoices -----> Axios Call ----> Get Data", response);
        this.setState({
          invoices: response.data.rechnungen
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

  aggregateCosts = (objArray, rechnungstyp) => {
    return objArray.slice()
    .map(invoice => {return invoice.rechnungstyp === rechnungstyp && invoice.betrag} )
      .reduce((acc, curValue) => { return (acc += curValue) });
  };
  

  render() {
    let sumTanken = 0;
    let sumVersicherung = 0;
    let sumWerkstatt = 0;
    let sumSteuer = 0;
    let sumKosten = []

    console.log("Report -----> rendered", this.state.invoices);
    
  // Kostenberechnung

  // Summe aller Kosten nach Rechnungstyp
    if (this.state.invoices.length > 0) {
      sumTanken = this.aggregateCosts(this.state.invoices, 'Tanken')
      sumVersicherung = this.aggregateCosts(this.state.invoices, 'Versicherung')
      sumWerkstatt = this.aggregateCosts(this.state.invoices, 'Werkstatt')
      sumSteuer = this.aggregateCosts(this.state.invoices, 'Steuer')
    
      
      sumKosten = [{Tanken: sumTanken}, {Versicherung: sumVersicherung}, {Werkstatt: sumWerkstatt}, {Steuer: sumSteuer}]
    }

    console.log("aggregierte Kosten:", sumKosten)

    
    //console.log(betrag);
    return (
      <div>
        <h4>Kosten Auswertung</h4>
        <p>{sumTanken}</p>
        
      </div>
    );
  }
}

