import React, { Component } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Form, Button } from "react-bootstrap";
import dateOperator from "../services/dateOperator";
import { valueLossYear } from '../services/valueloss';

const date = new Date();

export default class Invoices extends Component {
  state = {
    invoices: [],
    chart: "Kosten Verteilung",
    timeFilter: "Seit Kaufdatum",
    filteredYear: 0,
    filteredMonth: 0
  };

  getData = () => {
    axios
      .get(`/api/myCars/${this.props.carId}`)
      .then(response => {
        console.log("Invoices -----> Axios Call ----> Get Data", response);
        //add value loss to invoice book 
          let valueLossArr = valueLossYear(response.data);
          for (let loss of valueLossArr) {
            response.data.rechnungen.push(loss);
          }
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
    const filteredYear = this.state.filteredYear;
    const filteredMonth = this.state.filteredMonth;

    return objArray
      .slice()
      .map(invoice => {
        return (
          ((dateOperator(invoice.datum).year === filteredYear &&
          dateOperator(invoice.datum).month > filteredMonth) || (dateOperator(invoice.datum).year > filteredYear)) &&
          invoice.rechnungstyp === rechnungstyp &&
          invoice.betrag
        );
      })
      .reduce((acc, curValue) => {
        return (acc += curValue);
      });
  };

  handleTimeFilter = event => {
    switch (event.target.value) {
      case "Seit Kaufdatum":
        this.setState({
          [event.target.name]: event.target.value,
          filteredYear: 0,
          filteredMonth: 0
        });
        break;
      case "Letztes Jahr":
        this.setState({
          [event.target.name]: event.target.value,
          filteredYear: parseInt(date.getFullYear() - 1),
          filteredMonth: parseInt(date.getMonth() + 1)
        });
        break;
      case "Letzte 3 Jahre":
        this.setState({
          [event.target.name]: event.target.value,
          filteredYear: parseInt(date.getFullYear() - 3),
          filteredMonth: parseInt(date.getMonth() + 1)
        });
        break;
    }
  };

  selectChart = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    console.log("Report -----> rendered", this.state.invoices);

    let sumTanken = 0;
    let sumVersicherung = 0;
    let sumWerkstatt = 0;
    let sumSteuer = 0;
    let sumWertverlust = 0;
    let sumKosten = [];

    // Kostenauswertung

    // Summe aller Kosten nach Rechnungstyp
    if (this.state.invoices.length > 0) {
      sumTanken = this.aggregateCosts(this.state.invoices,"Tanken" );
      sumVersicherung = this.aggregateCosts(this.state.invoices, "Versicherung");
      sumWerkstatt = this.aggregateCosts(this.state.invoices, "Werkstatt");
      sumSteuer = this.aggregateCosts(this.state.invoices, "Steuer");
      sumWertverlust = this.aggregateCosts(this.state.invoices, "Wertverlust");

      sumKosten = [
        { Tanken: sumTanken },
        { Versicherung: sumVersicherung },
        { Werkstatt: sumWerkstatt },
        { Steuer: sumSteuer },
        { Wertverlust: sumWertverlust}
      ];
    }

    // Daten für Chart
    const data = { 
      labels: ["Tanken", "Werkstatt", "Versicherung", "Steuer", "Wertverlust"],
      datasets: [
        {
          label: "Kosten Verteilung",
          backgroundColor: ["#4682B4", "#B0C4DE", "#ADD8E6", "#87CEFA", "#5F9EA0"],
          data: [sumTanken, sumWerkstatt, sumVersicherung, sumSteuer, sumWertverlust]
        }
      ],
      options: {
        title: {
          display: true,
          text: "Kosten Verteilung: " + [this.state.timeFilter],
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
        },
        responsive: true
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
        <div>
          <Form className="chartFilter">
            <Form.Control
              className="chartSelectBox"
              as="select"
              name="chart"
              onChange={this.selectChart}
            >
              <option>Kosten Verteilung</option>
              <option>Kilometer Kosten</option>
            </Form.Control>

            <Form.Control
              className="chartSelectBox"
              as="select"
              name="timeFilter"
              onChange={this.handleTimeFilter}
            >
              <option>Seit Kaufdatum</option>
              <option>Letztes Jahr</option>
              <option>Letzte 3 Jahre</option>
            </Form.Control>
          </Form>

          {this.state.chart === "Kosten Verteilung" && (
            <div id="pieChart">
            <Pie
              width={800}
              height={500}
              ref="chart"
              data={data}
              options={data.options}
              plugins={data.plugins}
              responsive={true}
            />
            </div>
          )}
          
          {this.state.chart === "Kilometer Kosten" &&
          <div style={{margin: '10vh'}}>
          <h3>Vollversion Kaufen</h3>
          <Button variant="danger" type="submit">1,99 EUR / Monat</Button>
          </div>}
          
        </div>
      </div>
    );
  }
}
