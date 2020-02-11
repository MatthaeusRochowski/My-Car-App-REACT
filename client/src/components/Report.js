import React, { Component } from "react";
import axios from "axios";
import Chart from "chart.js";
import { Bar, defaults } from "react-chartjs-2";

/* const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
}; */

export default class Invoices extends Component {
  state = {
    invoices: []
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
    return objArray
      .slice()
      .map(invoice => {
        return invoice.rechnungstyp === rechnungstyp && invoice.betrag;
      })
      .reduce((acc, curValue) => {
        return (acc += curValue);
      });
  };

  render() {
    let sumTanken = 0;
    let sumVersicherung = 0;
    let sumWerkstatt = 0;
    let sumSteuer = 0;
    let sumKosten = [];

    console.log("Report -----> rendered", this.state.invoices);

    // Kostenberechnung

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
      datasets: [
        {
          label: ["Tanken", "Steuer"],
          backgroundColor: [
            "rgba(255, 0, 0, 0.7)",
          ],
          data: [sumTanken]
        },
        {
          label: ["Werkstatt"],
          backgroundColor: [
            "rgba(0, 255, 0, 0.7)"
          ],
          data: [sumWerkstatt]
        },
        {
          label: ["Versicherung"],
          backgroundColor: [
            "rgba(0, 0, 255, 0.7)"
          ],
          data: [sumVersicherung]
        }
        ,
        {
          label: ["Steuer"],
          backgroundColor: [
            "rgba(255, 0, 120, 0.7)"
          ],
          data: [sumSteuer]
        }
      ],
    };

    const options = {
      scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
      }
  }

    //console.log(betrag);
    return (
      <div>
        <h4>Kosten Auswertung</h4>

        <Bar width={900} height={600} ref="chart" data={data} options={options}/>
      </div>
    );
  }
}
