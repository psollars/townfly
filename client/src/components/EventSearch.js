import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEvents } from '../actions';
import moment from 'moment';
//import _ from 'lodash';

class EventSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      location: "",
      date: [],
      categories: []
      // distance
    }
  }

  render() {
    return (
        <div className="EventSearch">
          <input type="text" placeholder="location" onChange={this.handleLocation} />
          <div className="date-params">
            <button value="1" onClick={this.handleDate}>Today</button>
            <button value="2" onClick={this.handleDate}>Tomorrow</button>
            <button value="3" onClick={this.handleDate}>This Week</button>
          </div>
          <button onClick={this.handleSubmit}>Fetch Events</button>
        </div>
    );
  }

  handleLocation = (event) => {
    this.setState({
      location: event.target.value
    })
  };

  handleDate = (event) => {
    const dateParam = event.target.value;
    const nowUnix = moment().unix();
    const endOfTodayUnix = moment().endOf("day").unix();
    const endOfTomorrowUnix = moment().endOf("day").add(1, 'days').unix();
    const endOfWeekUnix = moment().add(7, 'days').unix();
    if (dateParam === "1") {
      this.setState({
        date: [nowUnix, endOfTodayUnix]
      })
    } else if (dateParam === "2") {
      this.setState({
        date: [endOfTodayUnix, endOfTomorrowUnix]
      })
    } else {
      this.setState({
        date: [nowUnix, endOfWeekUnix]
      })
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.fetchEvents(
      this.state.location,
      this.state.date,
      this.state.categories
    );
  };

}

const mapActionsToProps = {
  fetchEvents
};

export default connect(null, mapActionsToProps)(EventSearch);
