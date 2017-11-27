import React, { Component } from 'react';
import { connect } from 'react-redux';

class Events extends Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     lat: 0,
  //     lng: 0
  //   }
  // }

  render() {
    return (
      <div className="Events">
        <p>{this.props.events[0].name}</p>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    events: state.events
  };
}

export default connect(mapStateToProps)(Events);
