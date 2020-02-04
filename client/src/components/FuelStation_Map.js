import React from 'react';
import { GoogleMap, Marker } from 'google-map-react';

const FuelStation_Map = (props) => {
  const center = (props.center) ? props.center : {lat: 48.724312, lng: 11.207088 };
  const zoom   = 11;

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMap
        bootstrapURLKeys={{ key: 'AIzaSyDPIPUZEpxhHJFKdfVta60o6N25Rvzm7aQ' }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        {props.markers.map(marker => {
            return <Marker
              position={{lat: marker.lat, lng: marker.lng}}
              label={marker.text}
              visible={true}
            />
          })}
      </GoogleMap>
    </div>
  );
}

export default FuelStation_Map;