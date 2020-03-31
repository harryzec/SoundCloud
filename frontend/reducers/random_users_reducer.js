import {RECEIVE_RANDOM_USERS} from '../actions/user_actions'

const RandomReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_RANDOM_USERS:
        return Object.assign({}, action.users);
    default:
      return state;
  }
}

export default RandomReducer