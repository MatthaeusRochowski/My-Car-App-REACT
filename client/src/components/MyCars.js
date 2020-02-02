import React, { Component } from "react";
import axios from "axios";

import Car from './Car';

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
    console.log(this.state.cars)

    return (
      <div>
      <h1>Hi {this.props.user.username}</h1>
      <h3>Dein aktueller Fuhrpark</h3>
        <section id="car-overview">
          <div className="cards-container">
          {this.state.cars.map(car => {
            return (
          
              <Car key={car._id} car={car} />
              
            )
          })}

          </div>
        </section>
      </div>
    );
  }
}
