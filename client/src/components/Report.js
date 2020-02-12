import React, { Component } from "react";
import axios from "axios";
import Chart from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { Form, Col } from "react-bootstrap";
import dateOperator from "../services/dateOperator";

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
          dateOperator(invoice.datum).year >= filteredYear &&
          dateOperator(invoice.datum).month >= filteredMonth &&
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
    console.log("Report -----> rendered", this.state.chart);
    console.log("Chart Filtered -----> filter:", this.state.timeFilter);
    if (this.state.invoices.length > 0) {
      console.log(
        "Check dateOperator:",
        dateOperator(this.state.invoices[0].datum).year
      );
    }

    let sumTanken = 0;
    let sumVersicherung = 0;
    let sumWerkstatt = 0;
    let sumSteuer = 0;
    let sumKosten = [];

    // Kostenauswertung

    // Summe aller Kosten nach Rechnungstyp
    if (this.state.invoices.length > 0) {
      sumTanken = this.aggregateCosts(
        this.state.invoices,
        "Tanken",
        this.state.timeFilter
      );
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

    //console.log("aggregierte Kosten:", sumKosten);

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
            <Pie
              width={900}
              height={600}
              ref="chart"
              data={data}
              options={data.options}
              plugins={data.plugins}
            />
          )}
        </div>
      </div>
    );
  }
}
