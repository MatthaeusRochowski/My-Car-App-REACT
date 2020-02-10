import React, { Component } from 'react';
import CarDetails from "./CarDetails";
import Logbook from "./Logbook";
import axios from "axios";
import { Button, Card, Nav } from "react-bootstrap";


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
       
        
        <div className="overview">
          <CarDetails carId={this.props.match.params.id} deleteHandler={this.deleteCar} />
          <div className="car-details-logbook">
            <Card>
              <Card.Header>
                <Nav variant="tabs" defaultActiveKey='#logbuch'>
                  <Nav.Item>
                    <Nav.Link href='#logbuch'>Logbuch</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href='#rechnungen'>Rechnungen</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href='#kosten'>Kostenauswertung</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Header>
            </Card>
            <Logbook carId={this.props.match.params.id} />
          </div>
        </div>
      </div>
    )
  }
}
