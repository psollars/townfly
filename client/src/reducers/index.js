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
		case 'NEXT_EVENT':
            return nextEvent(state);
        case 'PREVIOUS_EVENT':
            return previousEvent(state);
		default:
			return state;
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