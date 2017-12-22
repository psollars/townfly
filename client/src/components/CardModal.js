import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from './Card';
import { hideEventDetails } from '../actions';

class CardModal extends Component {

  render() {
    return (
      <div className="CardModal">
        <div className="card-modal-wrapper">
          <div className="circle-close" onClick={this.props.hideEventDetails}>
            <i className="fa fa-close fa-lg"/>
          </div>
          <Card event={this.props.event} />
        </div>
        <div className="modal-bg" onClick={this.props.hideEventDetails}></div>
      </div> 
    );
  }
}

const mapActionsToProps = {
  hideEventDetails
};

export default connect(null, mapActionsToProps)(CardModal);
