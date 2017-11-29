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
        { this.props.loading ?
          <EventSearch /> :
          <Events />
        }
            
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
