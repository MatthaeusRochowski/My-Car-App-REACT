import React, { Component } from "react";
import {Link} from "react-router-dom";
import { Button } from "react-bootstrap";

import axios from "axios";

import Car from "./Car";

export default class MyCars extends Component {
  state = {
    cars: []
  };

  getData = () => {
    axios
      .get("/api/myCars")
      .then(response => {
        this.setState({
          cars: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getData();
  }
  

  render() {
    console.log("myCars -----> rendered");
    console.log(this.state.cars);

    return (
      <div>
        <h1>Hi {this.props.user.username}</h1>
        <h3>Dein aktueller Fuhrpark</h3>
        <section id="car-overview">
          <Link to="/addCar">
            <Button variant="info" type="submit">Fahrzeug hinzufügen</Button>
          </Link>
          <div className="cards-container">
            {this.state.cars.map(car => {
              return (
                <div key={car._id}>
                    <Car car={car} />
                </div>
              );
            })}
          </div>
        </section>
      </div>
    );
  }
}
