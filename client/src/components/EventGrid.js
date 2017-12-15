import React, { Component } from 'react';
import { connect } from 'react-redux';
import GridItem from './GridItem';
import CardModal from './CardModal';

class EventGrid extends Component {

  render() {
    const showEvents = this.props.events.map((event, index) => {
      return <GridItem
                key={event.id}
                event={event}
              />;
    });
    return (
      <div className="EventGrid">
        {this.props.showDetails === true ? <CardModal event={this.props.eventToShow} /> : null}
        {showEvents}
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    showDetails: state.showDetails,
    eventToShow: state.eventToShow
  };
}

export default connect(mapStateToProps)(EventGrid);
