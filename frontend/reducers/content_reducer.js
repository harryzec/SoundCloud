import { RECEIVE_CONTENT } from '../actions/user_actions'

const contentReducer = (state = {}, action) => {
  Object.freeze(state);
  
  switch(action.type) {
    case RECEIVE_CONTENT:
      return Object.assign({}, action.content)
    default: 
      return state;
  }
}

export default contentReducer