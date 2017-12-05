import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from './Card';
import { hideEventDetails } from '../actions';

class CardModal extends Component {

  render() {
    return (
      <div className="CardModal">
        <div className="cardModalWrapper">
          <p className="closeCardModal" onClick={this.props.hideEventDetails}>[X] Close Card</p>
          <Card event={this.props.event} />
        </div>
      </div>
    );
  }
}

const mapActionsToProps = {
  hideEventDetails
};

export default connect(null, mapActionsToProps)(CardModal);
