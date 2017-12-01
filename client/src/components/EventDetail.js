import React, { Component } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';

class EventDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }

  render() {
    return (
      <div className="eventCanvas">
        <div className="EventDetail">
            <img className="eventImage" src={this.props.event.coverPicture}/>            
            <div className="eventInfoContainer">
              <div className="eventInfoCard">
                <p className="eventTitle">{this.props.event.name}</p>
                <p className="eventDate"><Moment format="dddd, MMMM Do, YYYY">{this.props.event.startTime}</Moment></p>
                <hr/>
                <div className="eventTime">
                  <p><Moment format="LT">{this.props.event.startTime}</Moment>-<Moment format="LT">{this.props.event.endTime}</Moment></p>
                  <i className="fa fa-calendar" aria-hidden="true"></i>
                </div>
                <p className="eventVenue">{this.props.event.venue.name}</p>
                <a className="eventLocation" href={`https://www.google.com/maps/search/?api=1&query=${this.props.event.place.location.latitude},${this.props.event.place.location.longitude}&query_place_id=${this.props.event.place.id}`} target="_blank" rel="nofollow">
                  <p>{this.props.event.place.location.street}, {this.props.event.place.location.city}, {this.props.event.place.location.state} {this.props.event.place.location.zip}</p>
                  <i className="fa fa-external-link" aria-hidden="true"></i>
                </a>
                <p className={this.state.expanded ? `event-description expanded` : `event-description` }>{this.props.event.description}</p>
                {this.state.expanded ? 
                  <p>Hey there</p>
                : null }
                <button onClick={this.handleExpand} className="viewMore">view more</button>
              </div>  
            </div>
            <h6>{this.props.active}/{this.props.length}</h6>
         </div>
      </div>
    );
  }

  handleExpand = () => {
    this.setState({
      expanded: !this.state.expanded
    });
  };
}

export default EventDetail;
