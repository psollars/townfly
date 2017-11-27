import React, { Component } from 'react';
import { connect } from 'react-redux';
import EventDetail from './EventDetail';

class Events extends Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     lat: 0,
  //     lng: 0
  //   }
  // }

  render() {

    let message = "";
    if (this.props.events.length <= 0) {
      message = "Sorry, no events. :(";
    }

    const renderEvents = this.props.events.map((event) => {
      return <EventDetail key={event.id} event={event}/>;
    });

    return (
      <div className="Events">
        {renderEvents}
        {message}
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
