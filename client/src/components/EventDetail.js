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
                  <p><Moment format="LT">{this.props.event.startTime}</Moment>{this.props.event.endTime === null ? null : <span> - <Moment format="LT">{this.props.event.endTime}</Moment></span> }</p>
                  <div className="event-sharing">  
                    <a href={`https://www.facebook.com/events/${this.props.event.id}`} target="_blank" rel="nofollow"><i className="fa fa-facebook-square" aria-hidden="true"></i></a>
                    <i className="fa fa-calendar" aria-hidden="true"></i>
                  </div>
                </div>
                <p className="eventVenue">{this.props.event.venue.name}</p>
                <a className="eventLocation" href={`https://www.google.com/maps/search/?api=1&query=${this.props.event.place.location.latitude},${this.props.event.place.location.longitude}&query_place_id=${this.props.event.place.id}`} target="_blank" rel="nofollow">
                  <p>{this.props.event.place.location.street}, {this.props.event.place.location.city}, {this.props.event.place.location.state} {this.props.event.place.location.zip}</p>
                  <i className="fa fa-external-link" aria-hidden="true"></i>
                </a>
                <p className={this.state.expanded ? `event-description expanded` : `event-description` }>{this.props.event.description}</p>
                {this.state.expanded ? 
                <div className="event-expanded-container">
                  <div className="event-map">
                    <p>I'm the map.</p>
                    <p>Directions</p>
                  </div>
                </div>
                : null }
                <div className="view-toggle">
                  {this.state.expanded ? 
                  <div onClick={this.handleExpand}>
                    <i className="fa fa-chevron-up" aria-hidden="true"></i>
                    <p>view less</p>
                  </div>
                  : 
                  <div onClick={this.handleExpand}>
                    <p>view more</p>
                    <i className="fa fa-chevron-down" aria-hidden="true"></i>
                  </div>
                  }
                </div>
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
