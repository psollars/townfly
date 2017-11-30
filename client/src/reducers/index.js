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
    default:
      return state;
  }
}
