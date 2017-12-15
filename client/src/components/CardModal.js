import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from './Card';
import { hideEventDetails } from '../actions';

class CardModal extends Component {

  render() {
    return (
      <div>
        <div className="CardModal">
          <div className="cardModalWrapper">
            <div className="closeCardModal">
              <div className="circle-close" onClick={this.props.hideEventDetails}>
                <i className="fa fa-close fa-lg"/>
              </div>
            </div>
            <Card event={this.props.event} />
          </div>
        </div>
        <div className ="modal-bg"></div>
      </div>
      
    );
  }
}

const mapActionsToProps = {
  hideEventDetails
};

export default connect(null, mapActionsToProps)(CardModal);
