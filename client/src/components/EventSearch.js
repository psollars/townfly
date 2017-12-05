import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEvents, loadingToggle, detectLocation, clearLocation, setSearchParams } from '../actions';
import moment from 'moment';
import $ from "jquery-ajax";
import _ from 'lodash';

class EventSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayLocation: "",
      date: [moment().unix(), moment().add(7, 'days').unix(), 3],
      distance: "1609",
      categories: [],
      menuToggle: false,
      invalidSearch: false
    }
  }

  render() {
    return (
      <div className="EventSearch">
        <div className="heroHeader">
        <h1>Explore. Experience. TownFly.</h1>
        </div>
          <div className="search-card-container"> 
            <div className ="search-card" id="searchInput">
              <div className="location-params">
                <input className="searchInput" type="text" placeholder="zip code or city" value={ _.isEmpty(this.props.location) ? this.state.displayLocation : `${this.props.location.city}, ${this.props.location.administrativeLevels.level1short}`} onChange={this.handleTextLocation} onClick={this.handleClearLocation} />
                <div>
                  <div className="detect-location" onClick={this.handleGeoLocation}>detect my location&nbsp;<i className="fa fa-location-arrow" aria-hidden="true"></i></div>
                  { this.state.invalidSearch ? <p className="error-message">Woops, don't forget to enter or detect your location above!</p> : null }
                </div>
              </div>
              <hr className="divider"></hr>
              <label className="label">WHEN</label>
              <div className="date-params">
                <div className={ this.state.date[2] === 1 ? "radio-button active" : "radio-button"} data-date-param="1" onClick={this.handleDate}>today</div>
                <div className={ this.state.date[2] === 2 ? "radio-button active" : "radio-button"} data-date-param="2" onClick={this.handleDate}>tomorrow</div>
                <div className={ this.state.date[2] === 3 ? "radio-button active" : "radio-button"} data-date-param="3" onClick={this.handleDate}>this week</div>
              </div>
              <hr className="divider"></hr>
              <label className="label">WITHIN</label>
              <div className="distance-params"> 
                <div className={ this.state.distance === "1609" ? "radio-button active" : "radio-button"} data-distance="1609" onClick={this.handleDistance}>1 mile</div>
                <div className={ this.state.distance === "8046" ? "radio-button active" : "radio-button"} data-distance="8046" onClick={this.handleDistance}>5 miles</div>
                <div className={ this.state.distance === "16093" ? "radio-button active" : "radio-button"} data-distance="16093" onClick={this.handleDistance}>10 miles</div>
              </div>
              <hr className="divider"></hr>
              <label className="label">FILTER BY CATEGORIES</label>
              <div className="categories">
                <div className={ this.state.categories.findIndex(category => {return category === "ARTS_ENTERTAINMENT"}) === -1 ? "category " : "category-active "} data-cat="ARTS_ENTERTAINMENT" onClick={this.handleCatChange}>
                  <div className="circle" data-cat="ARTS_ENTERTAINMENT">
                    <i className={ this.state.categories.findIndex(category => {return category === "ARTS_ENTERTAINMENT"}) === -1 ? "fa fa-paint-brush fa-lg" : "fa fa-check fa-lg"} data-cat="ARTS_ENTERTAINMENT"></i>
                  </div>
                  <h6 data-cat="ARTS_ENTERTAINMENT">Arts & Entertainment</h6>
                </div>
                <div className={ this.state.categories.findIndex(category => {return category === "EDUCATION"}) === -1 ? "category" : "category-active"} data-cat="EDUCATION" onClick={this.handleCatChange}>
                  <div className="circle" data-cat="EDUCATION">
                    <i className={ this.state.categories.findIndex(category => {return category === "EDUCATION"}) === -1 ? "fa fa-graduation-cap fa-lg" : "fa fa-check fa-lg"} data-cat="EDUCATION"></i>
                  </div>
                  <h6 data-cat="EDUCATION">Education</h6>
                </div>
                <div className={ this.state.categories.findIndex(category => {return category === "FITNESS_RECREATION"}) === -1 ? "category" : "category-active"} data-cat="FITNESS_RECREATION" onClick={this.handleCatChange}>
                  <div className="circle" data-cat="FITNESS_RECREATION">
                    <i className={ this.state.categories.findIndex(category => {return category === "FITNESS_RECREATION"}) === -1 ? "fa fa-soccer-ball-o fa-lg" : "fa fa-check fa-lg"} data-cat="FITNESS_RECREATION"></i>
                  </div>
                  <h6 data-cat="FITNESS_RECREATION">Fitness & Recreation</h6>
                </div>
                <div className={ this.state.categories.findIndex(category => {return category === "FOOD_BEVERAGE"}) === -1 ? "category" : "category-active"} data-cat="FOOD_BEVERAGE" onClick={this.handleCatChange}>
                  <div className="circle" data-cat="FOOD_BEVERAGE">
                    <i className={ this.state.categories.findIndex(category => {return category === "FOOD_BEVERAGE"}) === -1 ? "fa fa-beer fa-lg" : "fa fa-check fa-lg"} data-cat="FOOD_BEVERAGE"></i>
                  </div>
                  <h6 data-cat="FOOD_BEVERAGE">Food & Beverage</h6>
                </div>
                <div className={ this.state.categories.findIndex(category => {return category === "HOTEL_LODGING"}) === -1 ? "category" : "category-active"} data-cat="HOTEL_LODGING" onClick={this.handleCatChange}>
                  <div className="circle" data-cat="HOTEL_LODGING">
                    <i className={ this.state.categories.findIndex(category => {return category === "HOTEL_LODGING"}) === -1 ? "fa fa-hotel fa-lg" : "fa fa-check fa-lg"} data-cat="HOTEL_LODGING"></i>
                  </div>
                  <h6 data-cat="HOTEL_LODGING">Hotel & Lodging</h6>
                </div>
                <div className={ this.state.categories.findIndex(category => {return category === "MEDICAL_HEALTH"}) === -1 ? "category" : "category-active"} data-cat="MEDICAL_HEALTH" onClick={this.handleCatChange}>
                  <div className="circle" data-cat="MEDICAL_HEALTH">
                  <i className={ this.state.categories.findIndex(category => {return category === "MEDICAL_HEALTH"}) === -1 ? "fa fa-heartbeat fa-lg" : "fa fa-check fa-lg"} data-cat="MEDICAL_HEALTH"></i>
                  </div>
                  <h6 data-cat="MEDICAL_HEALTH">Medical & Health</h6>
                </div>
                <div className={ this.state.categories.findIndex(category => {return category === "SHOPPING_RETAIL"}) === -1 ? "category" : "category-active"} data-cat="SHOPPING_RETAIL" onClick={this.handleCatChange}>
                  <div className="circle" data-cat="SHOPPING_RETAIL">
                    <i className={ this.state.categories.findIndex(category => {return category === "SHOPPING_RETAIL"}) === -1 ? "fa fa-shopping-bag fa-lg" : "fa fa-check fa-lg"} data-cat="SHOPPING_RETAIL"></i>
                  </div>
                  <h6 data-cat="SHOPPING_RETAIL">Shopping & Retail</h6>
                </div>
                <div className={ this.state.categories.findIndex(category => {return category === "TRAVEL_TRANSPORTATION"}) === -1 ? "category" : "category-active"} data-cat="TRAVEL_TRANSPORTATION" onClick={this.handleCatChange}>
                  <div className="circle" data-cat="TRAVEL_TRANSPORTATION">
                    <i className={ this.state.categories.findIndex(category => {return category === "TRAVEL_TRANSPORTATION"}) === -1 ? "fa fa-car fa-lg" : "fa fa-check fa-lg"} data-cat="TRAVEL_TRANSPORTATION"></i>
                  </div>
                  <h6 data-cat="TRAVEL_TRANSPORTATION">Travel & Transportation</h6>
                </div>
              </div>
              <div className="btnContain">
                <button className="searchButton" onClick={this.handleSubmit}>search events</button>
              </div>
            </div>
          </div>
      </div>
    );
  }

  handleTextLocation = (event) => {
    this.setState({
      displayLocation: event.target.value
    })
  };

  handleClearLocation = () => {
    this.props.clearLocation();
    this.setState({
        displayLocation: ""
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
    const clickedCategory = event.target.dataset.cat;    
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

  handleGeoLocation = () => {
    this.props.loadingToggle();
    const options = {
      enableHighAccuracy: true,
      timeout: 30000,
      maximumAge: 1800000
    };
    navigator.geolocation.getCurrentPosition((pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      this.props.detectLocation(null, lat, lon);
    }, (err) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }, options);
    this.setState({
      invalidSearch: false
    })
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (!this.state.displayLocation && _.isEmpty(this.props.location)) {
      this.setState({
        invalidSearch: true
      })
      return;
    } 
  
    this.props.setSearchParams(
      this.state.date,
      this.state.distance,
      this.state.categories
    )
    if (_.isEmpty(this.props.location)) {
      const text = this.state.displayLocation;
      this.props.detectLocation(text)
    } else {
      this.props.fetchEvents(
        this.props.location,
        this.state.date,
        this.state.distance,
        this.state.categories
      )
    }
  };

} // end of component

function mapStateToProps(state) {
  return {
      location: state.location
  };
}

const mapActionsToProps = {
  fetchEvents,
  loadingToggle,
  detectLocation,
  clearLocation,
  setSearchParams
};

export default connect(mapStateToProps, mapActionsToProps)(EventSearch);
