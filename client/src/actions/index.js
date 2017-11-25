import $ from "jquery-ajax";

//const apiUrl = process.env.API_URL;

export function fetchEvents() {
	return function(dispatch) {
		dispatch(requestEvents());
		$.get("/api/").done(function(events) {
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
