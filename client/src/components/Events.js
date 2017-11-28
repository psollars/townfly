import React, { Component } from 'react';
import { connect } from 'react-redux';
import EventDetail from './EventDetail';
import Controls from './Controls';

class Events extends Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     lat: 0,
  //     lng: 0
  //   }
  // }

  render() {
    const activeEventIndex = this.props.events.map((event, index) => {
      if (this.props.activeEventIndex === index){
        return <EventDetail 
                     key={event.id}
                     event={event}
                     active={index + 1}
                     length={this.props.events.length} />
      }
    });

    return (
      <div className="Events">
        { this.props.events.length <= 0 ?
          <p>Sorry, no events. :(</p> : null
        }
        {activeEventIndex}
        <Controls />
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    events: state.events,
    activeEventIndex: state.activeEventIndex,
  };
}

export default connect(mapStateToProps, null)(Events);
