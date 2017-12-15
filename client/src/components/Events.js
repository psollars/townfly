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
        <div className="header-bar-container">
          <div className="header-bar">
            <div className="back-to-search" onClick={this.props.returnToSearch}>Back</div> 
            <p>TOWNFLY</p>
            <div className="event-style-toggle" onClick={this.listToggleHandle}>{ this.state.listView === false ? `List View` : `Card View` }</div>
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
          <div className="no-events-found">
            <div className="empty-illustration"></div>
            <p className="no-events-found-header">No events found!</p>
            <p>Please double check your spelling or verify your location.</p>
            <div className="back-to-search-button" onClick={this.props.returnToSearch}>search again</div>
          </div> 
        : 
          null
        }
          { this.state.listView === false ?
            <EventCards events={this.state.eventsToDisplay} activeEventIndex={this.state.activeEventIndex} handleChangeIndex={this.handleChangeIndex} nextEvent={this.nextEvent} previousEvent={this.previousEvent}/>
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

  nextEvent = () => {
    if (this.state.activeEventIndex === this.state.eventsToDisplay.length - 1) {
      return;
    } else {
      let newIndex = this.state.activeEventIndex + 1;
      this.setState({
        activeEventIndex: newIndex
      })
    }
  }

  previousEvent = () => {
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
    });
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
