import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEvents } from '../actions';
import moment from 'moment';



class EventSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      date: [moment().unix(), moment().add(7, 'days').unix(), 3],
      distance: "1609",
      categories: []
    }
  }

  render() {
    return (
      <div className="EventSearch">
        <input className = "searchInput" type="text" placeholder="zip code or city" onChange={this.handleLocation} />
        <a className="nearMe" href="#">near me<span src = "icongoeshere"></span></a>
        <div>
          <hr className = "divider"></hr>
          <label className= "label">TIME</label>
          <div className="date-params">
            <div className={ this.state.date[2] === 1 ? "radio-button active" : "radio-button"} data-date-param="1" onClick={this.handleDate}>today</div>
            <div className={ this.state.date[2] === 2 ? "radio-button active" : "radio-button"} data-date-param="2" onClick={this.handleDate}>tomorrow</div>
            <div className={ this.state.date[2] === 3 ? "radio-button active" : "radio-button"} data-date-param="3" onClick={this.handleDate}>this week</div>
          </div>
        </div>
        <div >
          <hr className ="divider"></hr>
          <label className= "label">MILES AWAY</label>
          <div className="distance-params"> 
            <div className={ this.state.distance === "1609" ? "radio-button active" : "radio-button"} data-distance="1609" onClick={this.handleDistance}>1 mile</div>
            <div className={ this.state.distance === "8046" ? "radio-button active" : "radio-button"} data-distance="8046" onClick={this.handleDistance}>5 miles</div>
            <div className={ this.state.distance === "16093" ? "radio-button active" : "radio-button"} data-distance="16093" onClick={this.handleDistance}>10 miles</div>
          </div>
        </div>
        
        <div className="categories">
        
          <div className={ this.state.categories.findIndex(category => {return category === "ARTS_ENTERTAINMENT"}) === -1 ? "category" : "category-active"} id="ARTS_ENTERTAINMENT" onClick={this.handleCatChange}><div className = "circle"></div><h6>Arts & Entertainment</h6></div>
          <div className={ this.state.categories.findIndex(category => {return category === "EDUCATION"}) === -1 ? "category" : "category-active"} id="EDUCATION" onClick={this.handleCatChange}><div className = "circle"></div><h6>Education</h6></div>
          <div className={ this.state.categories.findIndex(category => {return category === "FITNESS_RECREATION"}) === -1 ? "category" : "category-active"} id="FITNESS_RECREATION" onClick={this.handleCatChange}><div className = "circle"></div><h6>Fitness & Recreation</h6></div>
          <div className={ this.state.categories.findIndex(category => {return category === "FOOD_BEVERAGE"}) === -1 ? "category" : "category-active"} id="FOOD_BEVERAGE" onClick={this.handleCatChange}><div className = "circle"></div><h6>Food & Beverage</h6></div>
          <div className={ this.state.categories.findIndex(category => {return category === "HOTEL_LODGING"}) === -1 ? "category" : "category-active"} id="HOTEL_LODGING" onClick={this.handleCatChange}><div className = "circle"></div><h6>Hotel & Lodging</h6></div>
          <div className={ this.state.categories.findIndex(category => {return category === "MEDICAL_HEALTH"}) === -1 ? "category" : "category-active"} id="MEDICAL_HEALTH" onClick={this.handleCatChange}><div className = "circle"></div><h6>Medical & Health</h6></div>
          <div className={ this.state.categories.findIndex(category => {return category === "SHOPPING_RETAIL"}) === -1 ? "category" : "category-active"} id="SHOPPING_RETAIL" onClick={this.handleCatChange}><div className = "circle"></div><h6>Shopping & Retail</h6></div>
          <div className={ this.state.categories.findIndex(category => {return category === "TRAVEL_TRANSPORTATION"}) === -1 ? "category" : "category-active"} id="TRAVEL_TRANSPORTATION" onClick={this.handleCatChange}><div className = "circle"></div><h6>Travel & Transportation</h6></div>
        </div>
        <div className="btnContain">
          <button className = "primaryButton" onClick={this.handleSubmit}>Fetch Events</button>
        </div>
      </div>
    );
  }

  handleLocation = (event) => {
    this.setState({
      location: event.target.value
    })
  };


  handleDate = (event) => {
    const dateParam = event.target.dataset.dateParam;
    const nowUnix = moment().unix();
    const endOfTodayUnix = moment().endOf("day").unix();
    const endOfTomorrowUnix = moment().endOf("day").add(1, 'days').unix();
    const endOfWeekUnix = moment().add(7, 'days').unix();
    if (dateParam === "1") {
      this.setState({
        date: [nowUnix, endOfTodayUnix, 1]
      })
    } else if (dateParam === "2") {
      this.setState({
        date: [endOfTodayUnix, endOfTomorrowUnix, 2]
      })
    } else {
      this.setState({
        date: [nowUnix, endOfWeekUnix, 3]
      })
    }
  };

  handleDistance = (event) => {
    this.setState({
        distance: event.target.dataset.distance
      })
  };

  handleCatChange = (event) => {
    const clickedCategory = event.target.id;    
    const categoryIndex = this.state.categories.findIndex(category => {
        return category === clickedCategory;
    });
    if (categoryIndex === -1) {
      this.setState(prevState => ({
        categories: [...prevState.categories, clickedCategory]
      }));
    } else {
      const newCategories = this.state.categories;
      newCategories.splice(categoryIndex, 1);
      this.setState(prevState => ({
        categories: newCategories
      }));
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.fetchEvents(
      this.state.location,
      this.state.date,
      this.state.distance,
      this.state.categories
    );
    if (!this.state.location) {
       alert("Please enter a city or zipcode");
    }
  };

} // end of component

const mapActionsToProps = {
  fetchEvents
};

export default connect(null, mapActionsToProps)(EventSearch);
