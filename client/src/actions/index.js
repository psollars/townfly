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

export function detectLocation (text, lat, lon) {
  return function(dispatch) {
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
    });
  };
}

function setLocation(location) {
  return {
    type: "SET_LOCATION",
    location
  };
}

// .then(geoResponse => {
//     this.setState({ location: geoResponse })
//   }).then(() => {
//     this.props.fetchEvents(
//       this.state.location,
//       this.state.date,
//       this.state.distance,
//       this.state.categories
//     )} 
//   )};
