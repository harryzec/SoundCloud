import {RECEIVE_FOLLOW} from '../actions/follow_action'

const FollowReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_FOLLOW:
        return Object.assign({}, state, action.follow);
    default:
      return state;
  }
}

export default FollowReducer