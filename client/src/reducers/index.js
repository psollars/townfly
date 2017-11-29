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
			return filterEvents(state, action.string);
		default:
			return state;

	}
}

function filterEvents(state, string) {
	const eventsToFilter = state.events.splice(0);
	const searchTerms = string.split(" ");
	// Potentially sanitize the input and eliminate punctuation such as commas and the like
	let filteredEvents = [];
	let foundMatch;
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
	return Object.assign({}, state, {
		events: filteredEvents
	});
}