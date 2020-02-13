import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { valueLossYear } from "../services/valueloss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class Invoices extends Component {
  state = {
    invoices: [],
    editActive: false
  };

  getData = () => {
    axios
      .get(`/api/myCars/${this.props.carId}`)
      .then(response => {
        console.log("Invoices -----> Axios Call ----> Get Data: ", response);
        //add value loss to invoice book
        let valueLossArr = valueLossYear(response.data);
        for (let loss of valueLossArr) {
          response.data.rechnungen.push(loss);
        }
        this.setState({
          invoices: response.data.rechnungen
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

  onDateChange = (date, key) => {
    const editInvoice = this.state.invoices.find(
      invoice => invoice._id === key
    );
    console.log("Changing Invoice:", editInvoice);
    editInvoice.datum =
      String(date.getDate()).padStart(2, "0") +
      "-" +
      String(date.getMonth() + 1).padStart(2, "0") +
      "-" +
      date.getFullYear();
    this.forceUpdate();
  };

  toggleEdit = () => {
    this.setState({
      oldState: JSON.parse(JSON.stringify(this.state)),
      editActive: !this.state.editActive
    });
  };

  handleCancel = event => {
    this.setState(this.state.oldState);
    delete this.state.oldState;
  };

  handleChange = (event, key) => {
    console.log("Changing Invoice for Key:", key);
    console.log("Changing Invoice for Event:", event.target);

    if (this.state.editActive) {
      const { name, value } = event.target;
      const editInvoice = this.state.invoices.find(
        invoice => invoice._id === key
      );
      console.log("Changing Invoice:", editInvoice);
      editInvoice[name] = value;
      this.forceUpdate();
    }
  };

  handleSubmit = event => {
    console.log("Invoice -----> Change Submitted");
    //console.log("Invoice -----> Changed State: ", this.state);
    event.preventDefault();

    let mongoInvoice = this.state.invoices.filter(invoice => {
      return invoice.rechnungstyp !== "Wertverlust";
    });
    axios
      .put(`/api/myCars/invoice/${this.props.carId}`, {
        invoices: mongoInvoice
      })
      .then(response => {
        this.setState({
          editActive: false
        });
        delete this.state.oldState;
      })
      .catch(err => console.log(err));
  };

  deleteInvoice = key => {
    console.log("Invoice delete triggered ----> Key: ", key);

    axios
      .delete(
        `/api/myCars/invoice/delete?carId=${this.props.carId}&invoiceId=${key}`
      )
      .then(response => {
        console.log(
          "Invoice Deleted -----> Axios Call ----> Get Data",
          response
        );
        this.setState({
          invoices: response.data.foundCar.rechnungen
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    console.log("Invoice -----> rendered", this.state.invoices);

    return (
      <div>
        <h4>Rechnungen</h4>
        {this.state.editActive === false && (
          <Button variant="info" onClick={this.toggleEdit}>
            Rechnung ändern
          </Button>
        )}
        {this.state.editActive && (
          <Button variant="info" onClick={this.handleSubmit} type="submit">
            Speichern
          </Button>
        )}
        {this.state.editActive && (
          <Button
            variant="info"
            className="btn btn-default pull-right"
            onClick={this.handleCancel}
          >
            Abbrechen
          </Button>
        )}
        <div className="scrollTable">
          <Table
            id="invoiceTable"
            striped
            bordered
            hover
            variant="dark"
            noDataIndication="X"
            keyField="id"
          >
            <thead>
              <tr>
                <th className='stickyTableHeader'>Datum</th>
                <th className='stickyTableHeader'>Kilometerstand</th>
                <th className='stickyTableHeader'>Rechnungstyp</th>
                <th className='stickyTableHeader'>Betrag</th>
                <th className='stickyTableHeader'>Eintrag löschen</th>
              </tr>
            </thead>
            <tbody>
              {this.state.invoices.map(invoice => {
                return (
                  <tr key={invoice._id}>
                    <td>
                      <DatePicker
                        className="logTableRowValue"
                        onChange={date => this.onDateChange(date, invoice._id)}
                        value={invoice.datum}
                        disabled={!this.state.editActive}
                      />
                    </td>
                    <td>
                      <input
                        name="kilometerstand"
                        className="logTableRowValue"
                        onChange={event =>
                          this.handleChange(event, invoice._id)
                        }
                        value={invoice.kilometerstand}
                      />
                    </td>
                    <td>
                      {this.state.editActive === false && invoice.rechnungstyp}
                      {this.state.editActive && (
                        <select
                          name="rechnungstyp"
                          className="logTableRowValue"
                          onChange={event =>
                            this.handleChange(event, invoice._id)
                          }
                        >
                          <option value={invoice.rechnungstyp || 0} selected>
                            {invoice.rechnungstyp}
                          </option>
                          <option value="Tanken">Tanken</option>
                          <option value="Werkstatt">Werkstatt</option>
                          <option value="Versicherung">Versicherung</option>
                          <option value="Steuer">Steuer</option>
                          <option value="Wertverlust">Wertverlust</option>
                        </select>
                      )}
                    </td>
                    <td>
                      <input
                        name="betrag"
                        className="logTableRowValue"
                        onChange={event =>
                          this.handleChange(event, invoice._id)
                        }
                        value={invoice.betrag || 0}
                      />
                    </td>
                    <td>
                      {this.state.editActive && (
                        <FontAwesomeIcon
                          variant="danger"
                          id="iconTrash"
                          onClick={() => this.deleteInvoice(invoice._id)}
                          icon={faTrash}
                        />
                      )}
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
