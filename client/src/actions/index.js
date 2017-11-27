import $ from "jquery-ajax";

//const apiUrl = process.env.API_URL;

export function fetchEvents(lat, lng) {
	return function(dispatch) {
		dispatch(requestEvents());
		$.get("/api/lat/lng/").done(function(events) {
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
