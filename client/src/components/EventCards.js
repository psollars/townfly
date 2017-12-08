import React, { Component } from 'react';
import { connect } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';
import Card from './Card';

class EventCards extends Component {

  render() {
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
          {this.props.events.length > 1 ? <div className="previousEventButton" onClick={this.props.previousEvent}>&lt;</div> : null}
          {this.props.events.length > 1 ? <div className="nextEventButton" onClick={this.props.nextEvent}>&gt;</div> : null}
          <SwipeableViews className="swipeable-views" index={this.props.activeEventIndex} onChangeIndex={this.props.handleChangeIndex}>
            {showEvents}
          </SwipeableViews>
      </div>
    );
  }

}

export default EventCards;
