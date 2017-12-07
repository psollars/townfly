import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeroHeader from './HeroHeader';
import EventCards from './EventCards';
import EventGrid from './EventGrid';
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

  componentDidMount() {
    let widthOfWindow = Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.documentElement.clientWidth
    );
    if (widthOfWindow >= 768) {
      this.setState({
        listView: true,
      })
    }
  }

  render() {

    return (
      <div>
        <HeroHeader />
        <div className ="search-controls">
          <div className="header-bar">
            <div className="backToSearch" onClick={this.props.returnToSearch}>Back</div> 
            <p>TOWNFLY</p>
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
          </div>
        </div>
        { this.state.eventsToDisplay.length <= 0 ?
          <div className="noEventsFound">
            <div className="empty-illustration"></div>
            <h6>No events found!</h6>
            <p>Please double check your spelling or try our “detect my location” feature.</p>
            <div className="backToSearchButton" onClick={this.props.returnToSearch}>search again</div>
          </div> 
        : 
          null
        }
          { this.state.listView === false ?
            <EventCards events={this.state.eventsToDisplay}/>
          :
            <EventGrid events={this.state.eventsToDisplay}/>
          }
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

  handleChangeIndex = (index) => {
    this.setState({
      activeEventIndex: index
    })
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

const mapActionsToProps = { 
  returnToSearch
};

export default connect(mapStateToProps, mapActionsToProps)(Events);
