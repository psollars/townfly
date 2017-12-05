import React, { Component } from 'react';
import { connect } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';
import GridItem from './GridItem';

class EventGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeEventIndex: 0,
    };
  }

  render() {
    const showEvents = this.props.events.map((event, index) => {
      return <GridItem
                key={event.id}
                event={event}
              />;
    })
    return (
      <div className="EventGrid">
        {showEvents}
      </div>
    );
  }

}

export default EventGrid;
