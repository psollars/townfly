import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEvents } from '../actions';
import _ from 'lodash';

class EventSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      location: "",
      categories: []
      // distance
      // time
    }
  }

  render() {
    return (
        <div className="EventSearch">
          <input type="text" placeholder="location" onChange={this.handleLocation} />
          <button onClick={this.handleSubmit}>Fetch Events</button>
        </div>
    );
  }

  handleLocation = (event) => {
    this.setState({
      location: event.target.value
    })
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.fetchEvents(
      this.state.location,
      this.state.categories
    );
  };

}

const mapActionsToProps = {
  fetchEvents
};

export default connect(null, mapActionsToProps)(EventSearch);
