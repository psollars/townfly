import React, { Component } from 'react';

class Controls extends Component {
  render() {
    return (
      <div className="Controls">
        <button className="previousEventButton" onClick={this.props.previousEvent}>&lt;</button>
        <button className="nextEventButton" onClick={this.props.nextEvent}>&gt;</button>
      </div>
    );
  }
}

export default Controls;