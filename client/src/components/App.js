import React, { Component } from 'react';
import { connect } from 'react-redux';
import EventSearch from './EventSearch';
import Events from './Events';
import HeaderBar from './headerBar';


class App extends Component {
  render() {
    return (
      <div className="App">
          <HeaderBar/>
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
    initialSearch: state.initialSearch
  };
}

export default connect(mapStateToProps)(App);
