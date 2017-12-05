import React, { Component } from 'react';
import { connect } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';
import EventDetail from './EventDetail';
import { returnToSearch } from '../actions';

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialEvents: this.props.events,
      eventsToDisplay: this.props.events,
      searchString: "",
      activeEventIndex: 0,
      listView: false,
    }
  }

  render() {

    const showEvents = this.state.eventsToDisplay.map((event, index) => {
      return <EventDetail 
                listView={this.state.listView}
                style={Object.assign({}, slideStyles.slide)}
                key={event.id}
                event={event}
                active={index + 1}
                length={this.state.eventsToDisplay.length}
              />;
    })

    return (
      <div>
        <div className="header-bar">
          <div className="backToSearch" onClick={this.props.returnToSearch}>Back</div> 
          <p onClick={this.props.returnToSearch}>TOWNFLY</p>
          <div className="viewToggle" onClick={this.listToggleHandle}>{ this.state.listView === false ? `List View` : `Card View` }</div>
        </div>
        <div className="Events">
          <div className="string-search-background">
            <div className="string-search-container">
              <i className="string-search-icon fa fa-search" aria-hidden="true"></i>
              <input className="string-search" type="text" id="eventFilter" onChange={this.eventFilter} placeholder="refine results by keyword" />
              <p className="string-search-results-count" >{this.state.eventsToDisplay.length} results</p>
            </div>
          </div>
          { this.state.eventsToDisplay.length <= 0 ?
            <p>Sorry, no events.</p> : null
          }
          <button className="previousEventButton" onClick={this.previousEvent}>&lt;</button>
          <button className="nextEventButton" onClick={this.nextEvent}>&gt;</button>
          { this.state.listView === false ?
            <SwipeableViews className="EventDetail" index={this.state.activeEventIndex} onChangeIndex={this.handleChangeIndex}>
              {showEvents}
            </SwipeableViews>
          :
            <div className="EventDetailGrid">{showEvents}</div>
          }
        </div>
      </div>
    );
  }

  listToggleHandle = (event) => {
    this.setState({
        listView: !this.state.listView
      })
  };

  eventFilter = (event) => {
    event.preventDefault();
    let currentString = event.target.value;
    let eventsToFilter = this.state.initialEvents;
    let userFilter = sanitizeString(currentString);
    let searchTerms = userFilter.split(" ");
    let numberOfTerms = searchTerms.length;
    let numberOfMatches;
    let foundMatch;
    let filteredEvents = [];
    if (currentString.length === 0) {
      let initialEvents = this.state.initialEvents;
      this.setState({
        searchString: event.target.value,
        eventsToDisplay: initialEvents,
        activeEventIndex: 0
      })
      return
    } else {
      eventsToFilter.forEach(function(item) {
        let eventDescription = item.name + " " + item.description;
        let filteredDescription = eventDescription.toLowerCase();
        numberOfMatches = 0;
        foundMatch = true;
        searchTerms.forEach(function(word) {
          let searchTerm = word.toLowerCase();
          if (filteredDescription.includes(searchTerm) === true && foundMatch === true) {
            numberOfMatches = numberOfMatches + 1;
          } else {
            foundMatch = false;
          }
        });
        if (numberOfMatches === numberOfTerms) {
          filteredEvents.push(item);
        }
      });
    }
    this.setState({
      searchString: event.target.value,
      eventsToDisplay: filteredEvents,
      activeEventIndex: 0
    })
  }

  nextEvent = (event) => {
    event.preventDefault();
    if (this.state.activeEventIndex === this.state.eventsToDisplay.length - 1) {
      return;
    } else {
      let newIndex = this.state.activeEventIndex + 1;
      this.setState({
        activeEventIndex: newIndex
      })
    }
  }

  previousEvent = (event) => {
    event.preventDefault();
    if (this.state.activeEventIndex === 0) {
      return;
    } else {
      let newIndex = this.state.activeEventIndex - 1;
      this.setState({
        activeEventIndex: newIndex
      })
    }
  }

  handleChangeIndex = (index) => {
    this.setState({
      activeEventIndex: index
    })
  }

}

const slideStyles = {
  slide: {
    padding: 15,
    minHeight: 100,
    color: "#fff"
  }
}

function sanitizeString(string) {
  let punctuationless = string.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
  var finalString = punctuationless.replace(/\s{2,}/g," ");
  return finalString;
}

function mapStateToProps(state) {
  return {
    events: state.events,
  };
}

const mapActionsToProps={returnToSearch};

export default connect(mapStateToProps, mapActionsToProps)(Events);
