import React, { Component } from 'react';
import { connect } from 'react-redux';
import EventSearch from './EventSearch';
import Events from './Events';
import Loader from './Loader';
import 'font-awesome/css/font-awesome.min.css';

class App extends Component {
  render() {
    return (
      <div className="App" id="page-top">
        <Loader loading={this.props.loading} />
        { this.props.initialSearch ? 
          <EventSearch /> :
          <Events />
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    initialSearch: state.initialSearch,
    loading: state.loading
  };
}

export default connect(mapStateToProps)(App);
