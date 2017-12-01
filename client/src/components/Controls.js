import React, { Component } from 'react';

class Controls extends Component {
  render() {
    return (
      <div className="Controls">
        <button className="previousEventButton" onClick={this.props.previousEvent}>Previous Event</button>
        <button className="nextEventButton" onClick={this.props.nextEvent}>Next Event</button>
      </div>
    );
  }
}

export default Controls;