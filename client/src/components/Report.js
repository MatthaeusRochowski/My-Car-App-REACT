import React, { Component } from "react";
import axios from "axios";
import Chart from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { Form } from "react-bootstrap";

const datum = new Date();
const heute =
  datum.getFullYear() + "-" + (datum.getMonth() + 1) + "-" + datum.getDate();
const letztesJahr =
  (datum.getFullYear() - 1) + "-" + (datum.getMonth() + 1) + "-" + datum.getDate();


export default class Invoices extends Component {
  state = {
    invoices: [],
    timeFilter: "Kompletter Zeitraum"
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

  aggregateCosts = (objArray, rechnungstyp, timeFilter) => {
    return objArray
      .slice()
      .map(invoice => {
        console.log("Inside aggregateCosts -----> Invoice Date:", invoice.datum, "letztesJahr:", letztesJahr)
        return invoice.rechnungstyp === rechnungstyp && invoice.betrag;
      })
      .reduce((acc, curValue) => {
        return (acc += curValue);
      });
  };

  handleTimeFilter = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {

    console.log("Report -----> rendered", this.state.invoices);
    //console.log("Chart Filtered -----> filter:", this.state.timeFilter )
    if (this.state.invoices.length > 0) {
    this.aggregateCosts(this.state.invoices, "Tanken");
    }

    let sumTanken = 0;
    let sumVersicherung = 0;
    let sumWerkstatt = 0;
    let sumSteuer = 0;
    let sumKosten = [];


    // Kostenauswertung

    // Summe aller Kosten nach Rechnungstyp
    if (this.state.invoices.length > 0) {
      sumTanken = this.aggregateCosts(this.state.invoices, "Tanken");
      sumVersicherung = this.aggregateCosts(
        this.state.invoices,
        "Versicherung"
      );
      sumWerkstatt = this.aggregateCosts(this.state.invoices, "Werkstatt");
      sumSteuer = this.aggregateCosts(this.state.invoices, "Steuer");

      sumKosten = [
        { Tanken: sumTanken },
        { Versicherung: sumVersicherung },
        { Werkstatt: sumWerkstatt },
        { Steuer: sumSteuer }
      ];
    }

    console.log("aggregierte Kosten:", sumKosten);
    console.log(
      "Kosten Object Keys:",
      sumKosten.map(element => Object.keys(element))
    );

    const data = {
      labels: ["Tanken", "Werkstatt", "Versicherung", "Steuer"],
      datasets: [
        {
          label: "Kosten Verteilung",
          backgroundColor: ["#4682B4", "#B0C4DE", "#ADD8E6", "#87CEFA"],
          data: [sumTanken, sumWerkstatt, sumVersicherung, sumSteuer]
        }
      ],
      options: {
        title: {
          display: true,
          text: "Kosten Verteilung",
          fontColor: "white",
          fontSize: 22
        },
        legend: {
          position: "bottom",
          labels: {
            // This more specific font property overrides the global property
            fontColor: "white",
            fontSize: 16,
            padding: 15
          }
        }
      },
      plugins: {
        datalabels: {
          formatter: function(value) {
            return data.labels[data] + "\n" + value + "%";
          }
        }
      }
    };

    /*     const options = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }; */

    //console.log(betrag);
    return (
      <div>
        <Form>
          <Form.Control
            as="select"
            name="timeFilter"
            onChange={this.handleTimeFilter}
          >
            <option>Kompletter Zeitraum</option>
            <option>Letztes Jahr</option>
            <option>Letzte 3 Jahre</option>
          </Form.Control>
        </Form>

        <Pie
          width={900}
          height={600}
          ref="chart"
          data={data}
          options={data.options}
          plugins={data.plugins}
        />
      </div>
    );
  }
}
