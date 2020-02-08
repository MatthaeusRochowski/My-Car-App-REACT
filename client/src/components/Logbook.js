import React, { Component } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";

export default class Logbook extends Component {
  state = {
    logbook: []
  }

  getData = () => {
    console.log("Logbook ----> getData executed")
    const id = this.props.carId;

    axios
      .get(`/api/myCars/${id}`)
      .then(response => {
        console.log("Logbook - Axios Call ----> Get Data executed", response);
        this.setState({
          logbook: response.data.logbook
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

  render() {
    console.log("Logbook -----> rendered")
    console.log("Logbook ---> props", this.props)


    return (
      <div>
        <h4>Fahrtenbuch</h4>
{/*         <Table striped bordered hover variant="dark">
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
           {this.state.logbooklogbook.map(log => {
              return (
                <tr key={log._id}>
                  <td>{log.datum}</td>
                  <td>{log.startort}</td>
                  <td>{log.zielort}</td>
                  <td>{log.kilometerstand_start}</td>
                  <td>{log.kilometerstand_ende}</td>
                  <td>{log.strecke_km}</td>
                  <td>ändern</td>
                  <td>löschen</td>
                </tr>
              );
            })}
          </tbody>
        </Table> */}
      </div>
    );
  }
}
