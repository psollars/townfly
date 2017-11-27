import React, { Component } from 'react';

class EventDetail extends Component {

  render() {
    return (
      <div className="EventDetail">
        <p>{this.props.event.name}</p>
      </div>
    );
  }
}

export default EventDetail;
