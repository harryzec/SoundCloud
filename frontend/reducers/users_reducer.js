import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_USER } from '../actions/user_actions'

const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_USER:
        return Object.assign({}, state, action.user );
    case RECEIVE_CURRENT_USER:
      if (action.currentUser === null) {
        let nextState = Object.assign({}, state)
        delete nextState[action.id]
        return nextState;
      }
      return Object.assign({}, state, { [action.currentUser.username]: action.currentUser });
    default:
      return state;
  }
};

export default usersReducer;
