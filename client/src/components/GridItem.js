import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import AddToCalendar from 'react-add-to-calendar';
import { showEventDetails } from '../actions';
import 'moment-timezone';

class GridItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentKey: this.props.event.id,
      expanded: false,
      calendarEvent: {
        title: this.props.event.name,
        description: this.props.event.description,
        location: this.props.event.place.name,
        startTime: this.props.event.startTime,
        endTime: this.props.event.endTime
      }
    };
  }

  render() {
    const fullAddress = `${this.props.event.place.location.street}, ${this.props.event.place.location.city}, ${this.props.event.place.location.state} ${this.props.event.place.location.zip}`;
    const directionParams = `origin=${this.props.location.formattedAddress}&destination=${fullAddress}`;
    return (
      <div className="event-grid-item" id={this.props.key}>
        <div className="event-image-container">
          <div className="event-image-wrapper">
            <img className="event-image" src={this.props.event.coverPicture}/>
          </div>
        </div>
        <div className="event-info-container">
          <div className="event-info-card">
            <p className="event-title">{this.props.event.name}</p>
            <p className="event-date"><Moment format="dddd, MMMM Do, YYYY">{this.props.event.startTime}</Moment></p>
            <hr className="divider" />
            <div className="event-time">
              <p><Moment format="LT">{this.props.event.startTime}</Moment>{this.props.event.endTime === null ? null : <span> - <Moment format="LT">{this.props.event.endTime}</Moment></span> }</p>
              <div className="event-sharing">  
                <a href={`https://www.facebook.com/events/${this.props.event.id}`} target="_blank" rel="nofollow"><i className="fa fa-facebook-square" aria-hidden="true"></i></a>
                <AddToCalendar event={this.state.calendarEvent} buttonLabel="" buttonTemplate={{"calendar" : "left"}} displayItemIcons={false} listItems={[ { google: 'Google' }, { apple: 'Apple Calendar' }, { outlook: 'Outlook' }, { outlookcom: 'Outlook.com' }, { yahoo: 'Yahoo' } ]} />              
              </div>
            </div>
            <p className="event-venue">{this.props.event.venue.name}</p>
            <a className="event-location" href={`https://www.google.com/maps/search/?api=1&query=${encodeURI(fullAddress)}`} target="_blank" rel="nofollow">
              <p>{fullAddress}</p>
              <i className="fa fa-external-link" aria-hidden="true"></i>
            </a>
            <p className={this.state.expanded ? `event-description expanded` : `event-description` }>{this.props.event.description}</p>
            {this.state.expanded ? 
            <div className="event-expanded-container">
              <div className="event-map-container">
                <div className="event-map">
                </div>
                <div className="directions">
                  <a href={`https://www.google.com/maps/dir/?api=1&${directionParams}&travelmode=driving`}  target="_blank" rel="nofollow"><i className="fa fa-car" aria-hidden="true"></i></a>
                  <a href={`https://www.google.com/maps/dir/?api=1&${directionParams}&travelmode=walking`}  target="_blank" rel="nofollow"><i className="fa fa-street-view" aria-hidden="true"></i></a>
                  <a href={`https://www.google.com/maps/dir/?api=1&${directionParams}&travelmode=bicycling`}  target="_blank" rel="nofollow"><i className="fa fa-bicycle" aria-hidden="true"></i></a>
                  <a href={`https://www.google.com/maps/dir/?api=1&${directionParams}&travelmode=transit`}  target="_blank" rel="nofollow"><i className="fa fa-bus" aria-hidden="true"></i></a>
                </div>
              </div>
            </div>
            : null }
            <div className="view-toggle">
            {this.state.expanded ? 
              <div>
                <i className="fa fa-chevron-up" aria-hidden="true"></i>
                <p>view less</p>
              </div>
              : 
              <div onClick={this.handleViewMore}>
                <p>view more</p>
                <i className="fa fa-chevron-down" aria-hidden="true"></i>
              </div>
            }
            </div>
          </div>  
        </div>
      </div>
    );
  }

  handleExpand = () => {
    this.setState({
      expanded: !this.state.expanded
    });
  };

  handleViewMore = () => {
    console.log(this.state.currentKey);
    console.log("yo!");
    this.props.showEventDetails(this.state.currentKey);
  };

}

const mapActionsToProps = {
  showEventDetails
};

function mapStateToProps(state) {
  return {
    location: state.location
  };
}

export default connect(mapStateToProps, mapActionsToProps)(GridItem);
