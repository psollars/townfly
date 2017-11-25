import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEvents } from '../actions';

class App extends Component {
  render() {
    return (
      <div className="App">
        <button onClick={this.props.fetchEvents}>Fetch Events</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.loading,
    events: state.events
  };
}

const mapActionsToProps = {
  fetchEvents
};

export default connect(mapStateToProps, mapActionsToProps)(App);
