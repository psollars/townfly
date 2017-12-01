import $ from "jquery-ajax";

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
