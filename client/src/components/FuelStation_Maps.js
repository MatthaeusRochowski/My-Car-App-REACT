import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({text}: any) => <div>{text}</div>;

export default class FuelStation_Maps extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 12
  };

  render() {
    console.log(this.props.center);
    console.log(this.props.markers);
    console.log(<AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />);
    return (
      // Important! Always set the container height explicitly
      // <GoogleMapReact    bootstrapURLKeys={{ key: /* YOUR KEY HERE */ }}
      <div style={{ height: '40vh', width: '50vw' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDPIPUZEpxhHJFKdfVta60o6N25Rvzm7aQ', language: 'de', region: 'de' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {this.props.markers.map(marker => {
            return <AnyReactComponent key={marker.index} text={marker.text} lat={marker.lat} lng={marker.lng} />
          })}
          {/*{this.props.markers.map(marker => {
            return <FuelStation_Mapmarker key={marker.index} {...marker} />
          })}*/}
        </GoogleMapReact>
      </div>
    )
  }
}