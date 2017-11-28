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
    const renderEvents = this.props.events.map((event) => {
      return <EventDetail key={event.id} event={event}/>;
    });

    return (
      <div className="Events">
        {renderEvents}
        { this.props.events.length <= 0 ?
          <p>Sorry, no events. :(</p> : null
        }
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
