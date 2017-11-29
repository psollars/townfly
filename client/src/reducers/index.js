import _ from 'lodash';

const INITIAL_STATE = {
  loading: true,
  activeEventIndex: 0,
  events: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "REQUEST_EVENTS":
      return Object.assign({}, state, {
        loading: true
      });
    case "RECEIVE_EVENTS":
      return Object.assign({}, state, {
        loading: false,
        events: action.events
      });
    case "FILTER_EVENTS":
      return filterEvents(state, action.string);
    case "NEXT_EVENT":
        return nextEvent(state);
    case "PREVIOUS_EVENT":
				return previousEvent(state);
		case 'SHUFFLE_EVENTS':
				return shuffleEvents(state);
		default:
			return state;
	}
}

function filterEvents(state, string) {
	const eventsToFilter = state.events.splice(0);
	const userFilter = sanitizeString(string);
	const searchTerms = userFilter.split(" ");
	let filteredEvents = [];
	let foundMatch;
	if (searchTerms[0] === "") {
		filteredEvents = eventsToFilter;
	} else {
		eventsToFilter.forEach(function(item) {
			let eventDescription = item.name.toLowerCase() + " " + item.description.toLowerCase();
			foundMatch = false;
			searchTerms.forEach(function(word) {
				let searchTerm = word.toLowerCase();
				if (eventDescription.includes(searchTerm) === true && foundMatch === false) {
					filteredEvents.push(item);
					foundMatch = true;
				}
			});
		});
	}
	
	return Object.assign({}, state, {
		events: filteredEvents
	});
}

	function sanitizeString(string) {
		let punctuationless = string.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
		var finalString = punctuationless.replace(/\s{2,}/g," ");
		return finalString;
	}

}

function nextEvent(state) {
  if (state.activeEventIndex === state.events.length -1){
    return state;
  }
  return Object.assign({}, state, {
    activeEventIndex: state.activeEventIndex + 1, 
  });
}

function previousEvent(state) {
  if (state.activeEventIndex === 0){
    return state;
  }
  return Object.assign({}, state, {
    activeEventIndex: state.activeEventIndex - 1,
  });
}

function shuffleEvents(state) {
	return Object.assign({}, state, {
		events: _.shuffle(state.events),
		activeEventIndex: 0
	});
}
