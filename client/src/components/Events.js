import React, { Component } from 'react';
import { connect } from 'react-redux';
import EventDetail from './EventDetail';
import Controls from './Controls';

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialEvents: this.props.events,
      eventsToDisplay: this.props.events,
      searchString: "",
      activeEventIndex: 0,
      filterUse: false
    }
  }

  render() {
    const activeEvent = this.state.eventsToDisplay.map((event, index) => {
      if (this.state.activeEventIndex === index){
        return <EventDetail 
                     key={event.id}
                     event={event}
                     active={index + 1}
                     length={this.state.eventsToDisplay.length} />;
      }
    });

    return (
      <div className="Events">
        <form>
          <input type="text" id="eventFilter" onChange={this.handleString} />
          <button type="submit" onClick={this.eventFilter}>Filter Results</button>
          <button type="reset" onClick={this.resetFilter}>Clear Filter</button>
        </form>

        { this.state.eventsToDisplay.length <= 0 ?
          <p>Sorry, no events.</p> : null
        }
        {activeEvent}
        <Controls nextEvent={this.nextEvent} previousEvent={this.previousEvent} />
      </div>
    );
  }

  eventFilter = (event) => {
    event.preventDefault();
    let currentString = this.state.searchString;
    let eventsToFilter = this.state.initialEvents;
    let userFilter = sanitizeString(currentString);
    let searchTerms = userFilter.split(" ");
    let filteredEvents = [];
    let foundMatch;
    if (currentString.length === 0) {
      return
    } else {
      eventsToFilter.forEach(function(item) {
        let eventDescription = item.name + " " + item.description;
        let filteredDescription = eventDescription.toLowerCase();
        foundMatch = false;
        searchTerms.forEach(function(word) {
          let searchTerm = word.toLowerCase();
          if (filteredDescription.includes(searchTerm) === true && foundMatch === false) {
            filteredEvents.push(item);
            foundMatch = true;
          }
        });
      });
    }
    this.setState({
      eventsToDisplay: filteredEvents,
      filterUse: true,
      activeEventIndex: 0
    })
  }

  handleString = (event) => {
    this.setState({
      searchString: event.target.value,
    })
  };

  resetFilter = (event) => {
    let initialEvents = this.state.initialEvents;
    this.setState({
      eventsToDisplay: initialEvents,
      searchString: "",
      filterUse: false,
      activeEventIndex: 0
    })
  };

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

export default connect(mapStateToProps)(Events);
