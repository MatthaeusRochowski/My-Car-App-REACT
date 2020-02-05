import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const style = { width: '100%', height: '80vh' };

export class FuelStationMap extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  render() {
    //zoom determination based on markers geo coordinates
    let points = [...this.props.markers].map(marker => { return {lat: marker.lat, lng: marker.lng }});

    let bounds = new this.props.google.maps.LatLngBounds();
    for (let i = 0; i < points.length; i++) {
      bounds.extend(points[i]);
    }

    return (
      <Map google={this.props.google} initialCenter={this.props.center} bounds={bounds} style={style} onClick={this.onMapClicked} streetViewControl={false} rotateControl={false}>
        {this.props.markers.map(marker => { return <Marker key={marker.index} {...marker} title={marker.brand + "\n" + marker.name} position={{lat: marker.lat, lng: marker.lng}} icon={{url: `http://maps.google.com/mapfiles/ms/icons/${marker.color}-dot.png`}} onClick={this.onMarkerClick} /> })}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          >
            <div className="googleMapsStationInfo">
              <h5>{this.state.selectedPlace.brand}</h5>
              <h6>{this.state.selectedPlace.name}</h6>
              <p><b>Strasse:</b> {this.state.selectedPlace.street}</p>
              <p><b>Stadt:</b> {this.state.selectedPlace.place}</p>
              <p><b>Entfernung (km):</b> {this.state.selectedPlace.dist}</p>
              <p><b>Benzin (E5):</b> {this.state.selectedPlace.e5}</p>
              <p><b>Benzin (E10):</b> {this.state.selectedPlace.e10}</p>
              <p><b>Diesel:</b> {this.state.selectedPlace.diesel}</p>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDPIPUZEpxhHJFKdfVta60o6N25Rvzm7aQ'
})(FuelStationMap)