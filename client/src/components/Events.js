import React, { Component } from 'react';
import { connect } from 'react-redux';
import EventDetail from './EventDetail';
import Controls from './Controls';
import _ from 'lodash';

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventsToDisplay: this.props.events,
      searchString: "",
      activeEventIndex: 0
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
        <input type="text" onChange={this.eventFilter} />
        { this.state.eventsToDisplay.length <= 0 ?
          <p>Sorry, no events. :(</p> : null
        }
        {activeEvent}
        <Controls nextEvent={this.nextEvent} previousEvent={this.previousEvent} shuffleEvents={this.shuffleEvents} />
      </div>
    );
  }

  eventFilter = (event) => {
    let currentString = event.target.value;
    let eventsToFilter = this.props.events.splice(0);
    let userFilter = sanitizeString(currentString);
    let searchTerms = userFilter.split(" ");
    let filteredEvents = [];
    let foundMatch;
    if (currentString.length <= 1) {
      this.setState({
        eventsToDisplay: this.props.events
      })
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
      searchString: event.target.value,
      activeEventIndex: 0
    })
  }

  handleString = (event) => {
    this.setState({
      searchString: event.target.value,
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

  shuffleEvents = (event) => {
    event.preventDefault();
    let shuffledEvents = _.shuffle(this.state.eventsToDisplay);
    this.setState({
      eventsToDisplay: shuffledEvents,
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

export default connect(mapStateToProps)(Events);
