import React, { Component } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";

export default class CarDetails extends Component {
  state = {
    car: "",
    kaufdaten: "",
    kennzeichen: "",
    editActive: false
  };

  getData = () => {
    const id = this.props.match.params.id;

    axios
      .get(`/api/myCars/${id}`)
      .then(response => {
        console.log(`/api/myCars Response`, response);
        this.setState({
          car: response.data,
          kaufdaten: response.data.kaufdaten,
          kennzeichen: response.data.kennzeichen
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
    this.state.editActive &&
      this.setState({
        [event.target.name]: event.target.value
      });
  };

  handleSubmit = event => {
    event.preventDefault();
    const id = this.props.match.params.id;
    axios
      .put(`/api/myCars/${id}`, {
        kennzeichen: this.state.kennzeichen,
      })
      .then(response => {
        this.setState({
          car: response.data,
          editActive: false
        });
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const car = this.state.car;
    //const kaufdaten = this.state.kaufdaten;
    console.log(`CarDetails -----> rendered for car id`, car._id);

    const { kennzeichen } = this.state;

    console.log(this.state.editActive);

    return (
      <div>
        <h2>Fahrzeug Details für {car.kennzeichen}</h2>

        <Button onClick={ this.toggleEdit }>Fahrzeugdaten ändern</Button>
        <form onSubmit={ this.handleSubmit }>

        <div className="car-img-div">
          <img src={ car.bild } className="car-image" alt="Autobild" />
        </div>

        <p className="p-class">
          <span>Kennzeichen:</span>
          <span>
            <input
              type="text"
              name="kennzeichen"
              id="kennzeichen"
              value={ kennzeichen }
              onChange={ this.handleChange }
              
            />
          </span>
        </p>

        <Button type="submit">Edit</Button>
        </form>
      </div>
    );
  }
}
