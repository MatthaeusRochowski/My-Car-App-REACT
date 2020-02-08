import React, { Component } from 'react';
import CarDetails from "./CarDetails";
import axios from "axios";
import { Button } from "react-bootstrap";


export default class CarView extends Component {

  deleteCar = () => {
    const id = this.props.match.params.id;

    axios
      .delete(`/api/myCars/${id}`)
      .then(response => {
        console.log(this.props.history);
        this.props.history.push("/myCars");
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    console.log("CarView -----> rendered")
    console.log("CarView ----> props: ", this.props);
    return (
      <div>
        <h2>Fahrzeug Details</h2>
        <Button variant="danger" onClick={this.deleteCar}>
              Fahrzeug löschen
            </Button>
        <CarDetails carId = {this.props.match.params.id} />
      </div>
    )
  }
}
