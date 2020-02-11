import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";
import axios from "axios";

export default class Invoices extends Component {
  state = {
    invoices: [],
    editActive: false
  };

  getData = () => {
    axios
      .get(`/api/myCars/${this.props.carId}`)
      .then(response => {
        console.log("Invoices -----> Axios Call ----> Get Data", response);
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

    axios
      .put(`/api/myCars/invoice/${this.props.carId}`, {
        invoices: this.state.invoices
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
          <Button onClick={this.toggleEdit}>Rechnung ändern</Button>
        )}
        {this.state.editActive && (
          <Button onClick={this.handleSubmit} type="submit">
            Speichern
          </Button>
        )}
        {this.state.editActive && (
          <Button
            type="reset"
            className="btn btn-default pull-right"
            onClick={this.handleCancel}
          >
            Abbrechen
          </Button>
        )}
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Datum</th>
              <th>Kilometerstand</th>
              <th>Rechnungstyp</th>
              <th>Betrag</th>
              <th>Eintrag löschen</th>
            </tr>
          </thead>
          <tbody>
            {this.state.invoices.map(invoice => {
              return (
                <tr key={invoice._id}>
                  <td>
                    <input
                      name="datum"
                      className="logTableRowValue"
                      onChange={event => this.handleChange(event, invoice._id)}
                      value={invoice.datum}
                    />
                  </td>
                  <td>
                    <input
                      name="kilometerstand"
                      className="logTableRowValue"
                      onChange={event => this.handleChange(event, invoice._id)}
                      value={invoice.kilometerstand}
                    />
                  </td>
                  <td>
                  {this.state.editActive === false && invoice.rechnungstyp}
                  {this.state.editActive &&
                    <select
                      name="rechnungstyp"
                      className="logTableRowValue"
                      onChange={event => this.handleChange(event, invoice._id)}
                    >
                      <option value={invoice.rechnungstyp} selected>{invoice.rechnungstyp}</option>
                      <option value="Tanken">Tanken</option>
                      <option value="Werkstatt">Werkstatt</option>
                      <option value="Versicherung">Versicherung</option>
                      <option value="Steuer">Steuer</option>
                      <option value="Wertverlust">Wertverlust</option>
                    </select>}
                  </td>
                  <td>
                    <input
                      name="betrag"
                      className="logTableRowValue"
                      onChange={event => this.handleChange(event, invoice._id)}
                      value={invoice.betrag}
                    />
                  </td>
                  <td>
                    {this.state.editActive && (
                      <Button
                        variant="danger"
                        onClick={() => this.deleteInvoice(invoice._id)}
                      >
                        löschen
                      </Button>
                    )}
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
