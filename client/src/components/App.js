import React, { Component } from 'react';
import { connect } from 'react-redux';
import EventSearch from './EventSearch';

class App extends Component {
  render() {
    return (
      <div className="App">
        <EventSearch />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.loading
  };
}

export default connect(mapStateToProps)(App);
