import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEvents } from '../actions';

class EventSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      lat: 0,
      lng: 0
    }
  }

  render() {
    return (
      <div className="EventSearch">
        <input type="number" placeholder="lat" onChange={this.handleLatChange} />
        <input type="number" placeholder="lng" onChange={this.handleLngChange} />
        <button onClick={this.handleSubmit}>Fetch Events</button>
      </div>
    );
  }

  handleLatChange = (event) => {
    this.setState({
      lat: event.target.value
    })
  };

  handleLngChange = (event) => {
    this.setState({
      lng: event.target.value
    })
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.fetchEvents(
      this.state.lat,
      this.state.lng
    );
  };

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

export default connect(mapStateToProps, mapActionsToProps)(EventSearch);
