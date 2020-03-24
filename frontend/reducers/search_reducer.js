import { RECEIVE_SEARCH } from '../actions/search_actions'

const searchReducer = (state = {}, action) => {
  Object.freeze(state);
  debugger
  switch(action.type) {
    case RECEIVE_SEARCH:
      return action.search
    default: 
      return state;
  }
}

export default searchReducer