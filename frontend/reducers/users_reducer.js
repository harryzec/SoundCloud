import { RECEIVE_CURRENT_USER } from '../actions/session_actions';

const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_CURRENT_USER:
      if (action.currentUser === null) {
        debugger
        let nextState = Object.assign({}, state)
        delete nextState[action.id]
        return nextState;
      }
      return Object.assign({}, state, { [action.currentUser.id]: action.currentUser });
    default:
      return state;
  }
};

export default usersReducer;
