import $ from "jquery-ajax";

//const apiUrl = process.env.API_URL;

export function fetchEvents(location, categories) {
	return function(dispatch) {
		dispatch(requestEvents());
 		$.ajax({
            url: "/api/",
            method: "GET",
            data: {
            	location: location,
            	categories: categories
            }
        }).done(function(events) {
            dispatch(receiveEvents(events));
		});
	};
}

export function filterEvents(string) {
	return {
		type: "FILTER_EVENTS",
		string
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

export function nextEvent() {
    return {
        type: "NEXT_EVENT"
    };
}

export function previousEvent() {
    return {
        type: "PREVIOUS_EVENT"
    };
}
