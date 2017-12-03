import $ from "jquery-ajax";

// location actions
export function detectLocation (text, lat, lon) {
  return function(dispatch) {
    dispatch(requestLocation());
    $.ajax({
      url: "/api/geolocate/",
      method: "GET",
      data: { 
        text: text, 
        lat: lat,
        lon: lon
      }
    }).done(function(location) {
      dispatch(setLocation(location));
    }).done(function(text) {
      console.log(text);
    });
  };
}

function requestLocation() {
  return {
    type: "REQUEST_LOCATION"
  };
}

function setLocation(location) {
  return {
    type: "SET_LOCATION",
    location
  };
}

export function clearLocation() {
  return {
    type: "CLEAR_LOCATION"
  };
}

// events actions
export function fetchEvents(location, date, distance, categories) {
  return function(dispatch) {
    dispatch(requestEvents());
    $.ajax({
      url: "/api/events/",
      method: "GET",
      data: {
        location: location,
        date: date,
        distance: distance,
        categories: categories
      }
      }).done(function(events) {
        dispatch(receiveEvents(events));
    });
  };
}

function requestEvents() {
  return {
    type: "REQUEST_EVENTS"
  };
}

function receiveEvents(events) {
  return {
    type: "RECEIVE_EVENTS",
    events
  };
}

// navigational & visual actions
export function returnToSearch () {
	return {
		type : "RETURN_SEARCH"
	};
}

export function loadingToggle () {
  return {
    type : "LOADING_TOGGLE"
  };
}
