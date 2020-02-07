import React, { Component } from 'react'

export default class FuelStationsBarEntry extends Component {

  handleClick = () => {
    return this.props.handler(this.props.id);
  }

  render() {
    //console.log(this.props);
    return (
      <div>
        <p onClick={this.handleClick} className="fuelSidebarEntry">
          <strong style={{color: this.props.color}}>{this.props.brand}</strong><br/>
          <strong>{this.props.name}</strong><br/>
          <b>Strasse: </b>{this.props.street}<br/>
          <b>Stadt: </b>{this.props.place}<br/>
          <b>Entfernung (km): </b>{this.props.dist}<br/>
          <b>Benzin (E5): </b>{this.props.e5}<br/>
          <b>Benzin (E10): </b>{this.props.e10}<br/>
          <b>Diesel: </b>{this.props.diesel}<br/>
        </p>
        <hr/>
      </div>
    )
  }
}
