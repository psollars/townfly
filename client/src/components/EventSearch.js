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
        <div className="categories">
          <div className="category" id="ARTS_ENTERTAINMENT" onClick={this.handleCatChange}>ARTS_ENTERTAINMENT</div>
          <div className="category" id="EDUCATION" onClick={this.handleCatChange}>EDUCATION</div>
          <div className="category" id="FITNESS_RECREATION" onClick={this.handleCatChange}>FITNESS_RECREATION</div>
          <div className="category" id="FOOD_BEVERAGE" onClick={this.handleCatChange}>FOOD_BEVERAGE</div>
          <div className="category" id="HOTEL_LODGING" onClick={this.handleCatChange}>HOTEL_LODGING</div>
          <div className="category" id="MEDICAL_HEALTH" onClick={this.handleCatChange}>MEDICAL_HEALTH</div>
          <div className="category" id="SHOPPING_RETAIL" onClick={this.handleCatChange}>SHOPPING_RETAIL</div>
          <div className="category" id="TRAVEL_TRANSPORTATION" onClick={this.handleCatChange}>TRAVEL_TRANSPORTATION</div>
        </div>
        <button onClick={this.handleSubmit}>Fetch Events</button>
      </div>
    );
  }

  handleLocation = (event) => {
    this.setState({
      location: event.target.value
    })
  };

  handleCatChange = (event) => {
    const newCat = event.target.id;    
    const categoryIndex = this.state.categories.findIndex(category => {
        return category === newCat;
    });
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
