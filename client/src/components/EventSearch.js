import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEvents } from '../actions';
import _ from 'lodash';

class EventSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      location: "",
      categories: []
    }
  }

  render() {
    return (
      <div className="EventSearch">
        <input type="text" placeholder="location" onChange={this.handleLocation} />
        <button onClick={this.handleSubmit}>Fetch Events</button>
        <div id="ARTS_ENTERTAINMENT" onClick={this.handleCatChange}>ARTS_ENTERTAINMENT</div>
        <div id="EDUCATION" onClick={this.handleCatChange}>EDUCATION</div>
        <div id="FITNESS_RECREATION" onClick={this.handleCatChange}>FITNESS_RECREATION</div>
        <div id="FOOD_BEVERAGE" onClick={this.handleCatChange}>FOOD_BEVERAGE</div>
        <div id="HOTEL_LODGING" onClick={this.handleCatChange}>HOTEL_LODGING</div>
        <div id="MEDICAL_HEALTH" onClick={this.handleCatChange}>MEDICAL_HEALTH</div>
        <div id="SHOPPING_RETAIL" onClick={this.handleCatChange}>SHOPPING_RETAIL</div>
        <div id="TRAVEL_TRANSPORTATION" onClick={this.handleCatChange}>TRAVEL_TRANSPORTATION</div>
      </div>
    );
  }

  handleCatChange = (event) => {
    const newCat = event.target.id;    
    const categoryIndex = this.state.categories.findIndex(category => {
        return category === newCat;
    })
    if (categoryIndex === -1) {
      this.setState(prevState => ({
        categories: [...prevState.categories, newCat]
      }));
    } else {
      const array = this.state.categories;
      array.splice(categoryIndex, 1);
      this.setState(prevState => ({
        categories: array
      }));
    }
  }; //end of cat change

  handleLocation = (event) => {
    this.setState({
      location: event.target.value
    })
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.fetchEvents(
      this.state.location,
      this.state.categories
    );
  };

}

const mapActionsToProps = {
  fetchEvents
};

export default connect(null, mapActionsToProps)(EventSearch);
