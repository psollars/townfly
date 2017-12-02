const INITIAL_STATE = {
  loading: false,
	events: [],
  initialSearch: true,
  location: {}
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
				events: action.events,
				initialSearch: false
			});
		case "RETURN_SEARCH":
			return Object.assign({}, state, {
			  initialSearch: true
      });
    case "REQUEST_LOCATION":
      return Object.assign({}, state, {
        loading: true
      });
    case "SET_LOCATION":
      return Object.assign({}, state, {
        location: action.location
      });
    default:
      return state;
  }
}
