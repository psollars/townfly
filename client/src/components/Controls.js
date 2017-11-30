import React, { Component } from 'react';

class Controls extends Component {
  render() {
    return (
      <div className="Controls">
        <button onClick={this.props.previousEvent}>Previous Event</button>
        <button onClick={this.props.nextEvent}>Next Event</button>
      </div>
    );
  }
}

export default Controls;