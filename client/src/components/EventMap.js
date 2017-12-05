import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {
  constructor(props) {
    super(props);

  }

  render() {
      return (
        <Map 
          google={this.props.google} 
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
  apiKey: "AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg"
})(MapContainer);
