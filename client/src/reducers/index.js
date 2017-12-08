const INITIAL_STATE = {
  loading: false,
  initialSearch: true,
  location: {},
  date: [],
  distance: "",
  categories: [],
  events: [],
  eventToShow: {},
  showDetails: false
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SET_SEARCH_PARAMS" :
      return Object.assign({}, state, {
        date: action.date,
        distance: action.distance,
        categories: action.categories
      });
    case "REQUEST_LOCATION":
      return Object.assign({}, state, {
        loading: true
      });
    case "SET_LOCATION":
      return Object.assign({}, state, {
        loading: false,
        location: action.location
      });
    case "CLEAR_LOCATION":
      return Object.assign({}, state, {
        location: {}
      });
    case "REQUEST_EVENTS":
      return Object.assign({}, state, {
        loading: true 
      });
    case "RECEIVE_EVENTS":
      return filterEvents(state, action.events);
      
    case "RETURN_SEARCH":
      return Object.assign({}, state, {
       initialSearch: true
      });
    case "LOADING_TOGGLE":
      return Object.assign({}, state, {
        loading: !state.loading
      });
    case "SHOW_EVENT_DETAILS":
      return showEventDetails(state, action.eventId);
    case "HIDE_EVENT_DETAILS":
      return Object.assign({}, state, {
        eventToShow: {},
        showDetails: false
      });
    default:
      return state;
  }
}
// makes sure there are no duplicates
function filterEvents(state, events) {
  const receivedEvents = events;
  const eventIdentifiers = [];
  const filteredEvents = [];
  receivedEvents.forEach(function(event) {
    if (eventIdentifiers.indexOf(event.id) === -1) {
      filteredEvents.push(event);
      eventIdentifiers.push(event.id);
    }
  });
  return Object.assign({}, state, {
    loading: false,
    events: filteredEvents,
    initialSearch: false
  });
}

// running a forEach to figure out which event details to show
function showEventDetails(state, id) {
  let events = state.events;
  let eventId = id;
  let foundEvent;
  events.forEach(function(event) {
    if (eventId === event.id) {
      foundEvent = event;
    }
  });
  return Object.assign({}, state, {
    eventToShow: foundEvent,
    showDetails: true
  });
};
