const INITIAL_STATE = {
	loading: true,
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
			return filterEvents(state, action.date, action.string);
		default:
			return state;

	}
}

function filterEvents(state, date, string) {
	const eventsToFilter = state.events.splice(0);
	let filteredEvents = [];
	eventsToFilter.forEach(function(item) {
		let eventDate = item.startTime.substring(0,10);
		if (date === "") {
			filteredEvents = eventsToFilter;
		} else if (eventDate === date) {
			filteredEvents.push(item);
		}
	});
	return Object.assign({}, state, {
		events: filteredEvents
	});
}