import React, { Component } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';



class EventDetail extends Component {


  render() {

    return (
      
      <div className ="eventCanvas">
        <div className="EventDetail">
            <img className= "eventImage" src = {this.props.event.coverPicture}/>
            
            <div className = "eventInfoContainer">
              <div className ="eventInfoCard">
                <p className= "eventTitle">{this.props.event.name}</p>
                <p className= "eventDate"><Moment format="dddd MMMM DD YYYY">{this.props.event.startTime}</Moment></p>
                <hr/>
                <p className= "eventTime"><Moment format="LT">{this.props.event.startTime}</Moment></p>
                <p className= "eventLocation">{this.props.event.place.location.street}{this.props.event.place.location.city}{this.props.event.place.location.state}{this.props.event.place.location.zip}</p>
                <p className= "eventDescription">{this.props.event.description}</p>
                <button className ="viewMore">view more</button>
              </div>
            </div>

            <h6>{this.props.active}/{this.props.length}</h6>
          </div>

          
        </div>
    );
  }
}

export default EventDetail;
