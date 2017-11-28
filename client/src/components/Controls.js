import React, { Component } from 'react';
import { connect } from 'react-redux';

import { previousEvent, nextEvent } from '../actions';

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

const mapActionsToProps = { previousEvent, nextEvent};

export default connect(null, mapActionsToProps)(Controls);