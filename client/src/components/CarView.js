import React, { Component } from 'react';
import CarDetails from "./CarDetails";
import Logbook from "./Logbook";
import Invoices from "./Invoices";
import Report from "./Report";
import axios from "axios";
import { Card, Nav, Button } from "react-bootstrap";


export default class CarView extends Component {
  state = {
    view: 'logbook',
  }

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

  handleView = (view) => {
    console.log("Inside CarView -----> open view for: ", view)
    this.setState({
      view: view
    })

  }

  render() {
    console.log("CarView -----> rendered")
    console.log("CarView ----> props: ", this.props);
    return (
      <div>
        <h2>Fahrzeug Details</h2>        
        <div className="overview">
          <CarDetails carId={this.props.match.params.id} deleteHandler={this.deleteCar} />
          <div className="car-details-logbook">
            <Card bg="dark">
              <Card.Header>
                <Nav variant="tabs" defaultActiveKey='#logbuch'>
                  <Nav.Item>
                    <Button variant="info" onClick={() => this.handleView('logbook')}>Logbuch</Button>
                  </Nav.Item>
                  <Nav.Item>
                    <Button variant="info" onClick={() => this.handleView('invoices')}>Rechnungen</Button>
                  </Nav.Item>
                  <Nav.Item>
                    <Button variant="info" onClick={() => this.handleView('report')}>Kostenauswertung</Button>
                  </Nav.Item>
                </Nav>
              </Card.Header>
            </Card>
            <div style={{width: '70vw'}}>
            {this.state.view === 'logbook' && <Logbook carId={this.props.match.params.id} />}
            {this.state.view === 'invoices' && <Invoices carId={this.props.match.params.id} restwert={this.state.restwertArr} />}
            {this.state.view === 'report' && <Report carId={this.props.match.params.id} />}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
