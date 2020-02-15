import { RECEIVE_SONG } from '../actions/song_action'

const songReducer = (state = {}, action) => {
  Object.freeze(state);
  debugger
  switch(action.type) {
    case RECEIVE_SONG:
      // let added = { [action.song.id]: action.song }
      return Object.assign({}, state, action.song)
    default: 
      return state;
  }
}

export default songReducer