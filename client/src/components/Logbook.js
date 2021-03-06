import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class Logbook extends Component {
  state = {
    logbook: [],
    editActive: false
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

  toggleEdit = () => {
    this.setState({
      oldState: JSON.parse(JSON.stringify(this.state)),
      editActive: !this.state.editActive
      
    });
  };

  onDateChange = (date, key) => {
    const editLog = this.state.logbook.find(
      log => log._id === key
    );
    console.log("Changing Log Entry:", editLog)
    editLog.datum = (String(date.getDate()).padStart(2, '0') + "-" + String(date.getMonth() + 1).padStart(2, '0') + "-" + date.getFullYear());
    this.forceUpdate();
  }

  handleCancel = event => {
    this.setState(
      this.state.oldState
    )
    delete this.state.oldState
   }

  handleChange = (event, key) => {
    console.log("Changing Log Entry for Key:", key);
    console.log("Changing Log Entry for Event:", event.target);
    
    if (this.state.editActive) {
      const { name, value } = event.target;
      const editLog = this.state.logbook.find(log => log._id === key)
      console.log("Changing Log Entry:", editLog)
      editLog[name] = value;
      const strecke = editLog.kilometerstand_ende - editLog.kilometerstand_start;
      editLog.strecke_km = strecke;
      console.log("Changing Log Entry for Strecke:", editLog.strecke_km);
      this.forceUpdate();
    }
  };

  handleSubmit = event => {
    console.log("Logbook -----> Change Submitted");
    //console.log("Logbook -----> Changed State: ", this.state);
    //const strecke = this.state.kilometerstand_ende - this.state.kilometerstand_start;
    event.preventDefault();

    axios
      .put(`/api/myCars/logbook/${this.props.carId}`, {
        logbook: this.state.logbook
      })
      .then(response => {
        //console.log("AddLog -----> New log created --> Response:", response);
        this.setState({
          editActive: false
        });
        delete this.state.oldState
      })
      .catch(err => console.log(err))
  };

  deleteLogEntry = key => {
    console.log("Log delete triggered ----> Key: ", key);

    axios
      .delete(
        `/api/myCars/logbook/delete?carId=${this.props.carId}&logId=${key}`
      )
      .then(response => {
        console.log(
          "Logbook Deleted -----> Axios Call ----> Get Data",
          response
        );
        this.setState({
          logbook: response.data.foundCar.logbuch
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    console.log("Logbook -----> rendered", this.state.logbook);

    return (
      <div>
        <h4>Fahrtenbuch</h4>
        {this.state.editActive === false &&
        <Button variant="info" onClick={this.toggleEdit}>Logbuch ändern</Button>}
        {this.state.editActive && (
          <Button variant="info" onClick={this.handleSubmit} type="submit">Speichern</Button>
        )}
        {this.state.editActive && (
          <Button
            variant="info"
            type="reset"
            className="btn btn-default pull-right"
            onClick={this.handleCancel}
          >
            Abbrechen
          </Button>
        )}
        <div className='scrollTable'>
          <Table id="logbookTable" striped bordered hover variant="dark" noDataIndication="X" keyField='id'>
          <thead>
            <tr>
              <th className='stickyTableHeader'>Datum</th>
              <th className='stickyTableHeader'>Startort</th>
              <th className='stickyTableHeader'>Zielort</th>
              <th className='stickyTableHeader'>Km Start</th>
              <th className='stickyTableHeader'>Km Ende</th>
              <th className='stickyTableHeader'>Strecke Gesamt</th>
              <th className='stickyTableHeader'>Eintrag löschen</th>
            </tr>
          </thead>
          <tbody>
            {this.state.logbook.map(log => {
              return (
                <tr key={log._id}>
                  <td>
                  {/*<input name="datum" className="logTableRowValue" onChange={(event) => this.handleChange(event, log._id)} value={log.datum} />*/}
                    <DatePicker
                      className="logTableRowValue"
                      onChange={date => this.onDateChange(date, log._id)}
                      value={log.datum}
                      disabled={!this.state.editActive}
                    />
                  </td>
                  <td><input name="startort" className="logTableRowValue" onChange={(event) => this.handleChange(event, log._id)} value={log.startort} /></td>
                  <td><input name="zielort" className="logTableRowValue" onChange={(event) => this.handleChange(event, log._id)} value={log.zielort} /></td>
                  <td><input name="kilometerstand_start" className="logTableRowValue" onChange={(event) => this.handleChange(event, log._id)} value={log.kilometerstand_start} /></td>
                  <td><input name="kilometerstand_ende" className="logTableRowValue" onChange={(event) => this.handleChange(event, log._id)} value={log.kilometerstand_ende} /></td>
                  <td>{log.strecke_km}</td>
                  <td>
                  {this.state.editActive && <FontAwesomeIcon
                      variant="danger"
                      id="iconTrash"
                      onClick={() => this.deleteLogEntry(log._id)}
                      icon={faTrash}
                    />}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        </div>
      </div>
    );
  }
}
