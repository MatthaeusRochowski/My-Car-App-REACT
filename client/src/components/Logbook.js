import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";
import axios from "axios";

export default class Logbook extends Component {
  state = {
    logbook: []
  };

  getData = () => {
    axios
      .get(`/api/myCars/${this.props.carId}`)
      .then(response => {
        console.log("Logbook -----> Axios Call ----> Get Data", response);
        this.setState({
          logbook: response.data.logbuch
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

  deleteLogEntry = key => {
    console.log("Log delete triggered ----> Key: ", key);

    axios
      .delete(`/api/myCars/logbook/delete?carId=${this.props.carId}&logId=${key}`)
      .then( response => {
        console.log("Logbook Deleted -----> Axios Call ----> Get Data", response);
        this.setState({
          logbook: response.data.foundCar.logbuch
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    console.log("Logbook -----> rendered");

    return (
      <div>
        <h4>Fahrtenbuch</h4>
        <Table striped bordered hover variant="dark">
          <thead>
            <th>Datum</th>
            <th>Startort</th>
            <th>Zielort</th>
            <th>Km Start</th>
            <th>Km Ende</th>
            <th>Strecke Gesamt</th>
            <th>Eintrag ändern</th>
            <th>Eintrag löschen</th>
          </thead>
          <tbody>
            {this.state.logbook.map(log => {
              return (
                <tr key={log._id}>
                  <td>{log.datum}</td>
                  <td>{log.startort}</td>
                  <td>{log.zielort}</td>
                  <td>{log.kilometerstand_start}</td>
                  <td>{log.kilometerstand_ende}</td>
                  <td>{log.strecke_km}</td>
                  <td>ändern</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => this.deleteLogEntry(log._id)}
                    >
                      löschen
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}
