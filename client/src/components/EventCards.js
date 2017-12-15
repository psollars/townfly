import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';
import Card from './Card';

class EventCards extends Component {

  render() {
    /// map through events and displays them on card format
    const showEvents = this.props.events.map((event, index) => {
      return <Card
                key={event.id}
                event={event}
                active={index + 1}
                length={this.props.events.length}
              />;
    });
    return (
      <div className="EventCards">
          {this.props.events.length > 1 ? <div className="previous-event-button" onClick={this.props.previousEvent}><i className="fa fa-chevron-left" aria-hidden="true"></i></div> : null}
          {this.props.events.length > 1 ? <div className="next-event-button" onClick={this.props.nextEvent}><i className="fa fa-chevron-right" aria-hidden="true"></i></div> : null}
          <SwipeableViews className="swipeable-views" index={this.props.activeEventIndex} onChangeIndex={this.props.handleChangeIndex}>
            {showEvents}
          </SwipeableViews>
      </div>
    );
  }

}

export default EventCards;
