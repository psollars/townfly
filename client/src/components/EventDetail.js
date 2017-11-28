import React, { Component } from 'react';

class EventDetail extends Component {

  render() {
    return (
      <div className="EventDetail">
        <p>{this.props.event.name}</p>
        <h6>{this.props.active}/{this.props.length}</h6>
      </div>
    );
  }
}

export default EventDetail;
