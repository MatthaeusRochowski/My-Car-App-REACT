import React, { Component } from 'react';
import { Button } from "react-bootstrap";

export default class FuelStationsBarEntry extends Component {

  state = {
    imageLoadError: true,
  }

  handleClick = () => {
    return this.props.handler(this.props.id);
  }

  render() {
    //console.log(this.props);
    return (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#343a40'}}>
        <Button type="submit" style={{width: '99%', opacity: 0.8}} size='sm' variant='outline-info'>
          <p onClick={this.handleClick} className="fuelSidebarEntry" style={{marginBottom: '0px', paddingLeft: '0px'}}>
            <strong style={{fontSize: '1.1rem', textDecoration: 'underline'}}>{this.props.brand}</strong>
            <img src={this.props.iconUrl}
              onError={e => {
                if(this.state.imageLoadError) { 
                  this.setState({
                      imageLoadError: false
                  });
                  e.target.src = './fuelStationIcons/default.png';
                }
              }}
              alt='' style={{width: '30px', height: 'auto', position: 'fixed', right: '7px', paddingTop: '1px'}}
            /><br/>
            <b style={{paddingLeft: '5px'}}>Strasse: </b>{this.props.street}<br/>
            <b style={{paddingLeft: '5px'}}>Stadt: </b>{this.props.city}<br/>
            <b style={{paddingLeft: '10px'}}>Entfernung (km): </b>{this.props.dist}<br/>
            <b style={{paddingLeft: '10px'}}>Benzin (E5): </b>{this.props.e5}<br/>
            <b style={{paddingLeft: '10px'}}>Benzin (E10): </b>{this.props.e10}<br/>
            <b style={{paddingLeft: '10px'}}>Diesel: </b>{this.props.diesel}<br/>
          </p>
        </Button>
        <hr style={{margin: '2px 0px'}}/>
      </div>
    )
  }
}
