import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {

  render() {

    const style = {
      position: 'absolute',
      width: '100%',
      height: '480px'
    };

      return (

        <Map 
          google={this.props.google}
          style={style} 
          zoom={15}
          initialCenter={{
              lat: this.props.lat,
              lng: this.props.lng
          }}
        >
   
          <Marker
            position={{
              lat: this.props.lat,
              lng: this.props.lng
            }} 
          />

        </Map>
      );
    }
  }



export default GoogleApiWrapper({
  apiKey: "AIzaSyCbtC-ilpidgbXawTk3Ed-3Sk6XTPogWxE"
})(MapContainer);
