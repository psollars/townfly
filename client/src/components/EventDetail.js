import React, { Component } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';

class EventDetail extends Component {


  render() {
    
    const dateStamp = this.props.event.startTime;
    
  //   const categoryPrint = ()=> {
  //     if (this.props.event.category === true){
  //     <p className= "eventCategory">{this.props.event.category}</p>;
  //   }else{
  //   return false;
  //   }
  // };

    return (
      
      <div className ="eventCanvas">
        <div className="EventDetail">
          <p className= "eventTitle">{this.props.event.name}</p>
          <p className= "eventDate"><Moment>{dateStamp}</Moment></p>
          
          <div className ="imageCard">
            <img className= "eventImage" src = {this.props.event.coverPicture}/>
            <p className= "eventCategory">{this.props.event.category}</p>

            
          </div>
          
          <div className ="eventInfo">
            <div className ="eventInfoCard">
              <p className= "eventTime"><Moment>{dateStamp}</Moment></p>
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
