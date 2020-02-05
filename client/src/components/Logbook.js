import React, { Component } from "react";
import { Table } from "react-bootstrap";

export default class Logbook extends Component {
  render() {
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
          <tr>
            <td>2020-02-01</td>
            <td>Ingolstadt</td>
            <td>München</td>
            <td>20</td>
            <td>100</td>
            <td>80</td>
            <td>ändern</td>
            <td>löschen</td>
          </tr></tbody>
        </Table>
      </div>
    );
  }
}
