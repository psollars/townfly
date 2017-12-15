import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { showEventDetails } from '../actions';
import 'moment-timezone';

class GridItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentKey: this.props.event.id,
    };
  }

  render() {
    return (
      <div className="event-grid-item-container">
        <div className="event-grid-item" id={this.props.key} onClick={this.handleViewMore}>
          <div className="event-image-container">
            <div className="event-image-wrapper">
              <img className="event-image" src={this.props.event.coverPicture}/>
            </div>
          </div>
          <div className="event-info-container">
            <div className="event-info-card">
              <p className="event-title">{this.props.event.name}</p>
              <p className="event-date"><Moment format="dddd">{this.props.event.startTime}</Moment> at <Moment format="LT">{this.props.event.startTime}</Moment></p>
              <p className="view-more">click to view more</p>
            </div>  
          </div>
        </div>
      </div>
    );
  }

  handleViewMore = () => {
    this.props.showEventDetails(this.state.currentKey);
    window.scrollTo(0,0);
  };

}

const mapActionsToProps = {
  showEventDetails
};

export default connect(null, mapActionsToProps)(GridItem);
