import React, { Component } from 'react';
import { connect } from 'react-redux';
import EventDetail from './EventDetail';
import { filterEvents } from '../actions/';
import Controls from './Controls';

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      string: "",
    }
  }

  render() {
    const activeEventIndex = this.props.events.map((event, index) => {
      if (this.props.activeEventIndex === index){
        return <EventDetail 
                     key={event.id}
                     event={event}
                     active={index + 1}
                     length={this.props.events.length} />;
      }
    });

    return (
      <div className="Events">
        <input type="string" onChange={this.handleString} />
        <button onClick={this.eventFilter}>Filter Results by String</button>
        { this.props.events.length <= 0 ?
          <p>Sorry, no events. :(</p> : null
        }
        {activeEventIndex}
        <Controls />
      </div>
    );
  }

  handleString = (event) => {
    this.setState({
      string: event.target.value
    })
  };

  eventFilter = (event) => {
    event.preventDefault();
    this.props.filterEvents(this.state.string);
  };

}

const mapActionsToProps = {
  filterEvents
};

function mapStateToProps(state) {
  return {
    events: state.events,
    activeEventIndex: state.activeEventIndex,
  };
}

export default connect(mapStateToProps, mapActionsToProps)(Events);
