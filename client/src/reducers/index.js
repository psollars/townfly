const INITIAL_STATE = {
  loading: false,
  initialSearch: true,
  location: {},
  events: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "REQUEST_LOCATION":
      return Object.assign({}, state, {
        loading: true
      });
    case "SET_LOCATION":
      return Object.assign({}, state, {
        loading: false,
        location: action.location
      });
    case "CLEAR_LOCATION":
      return Object.assign({}, state, {
        location: {}
      });
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
    case "LOADING_TOGGLE":
      return Object.assign({}, state, {
        loading: !state.loading
      });
    default:
      return state;
  }
}
