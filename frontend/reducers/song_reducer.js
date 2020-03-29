import { RECEIVE_SONG, RECEIVE_SONGS, DELETE_SONG } from '../actions/song_action'

const songReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_SONG:
      // let added = { [action.song.id]: action.song }
      return Object.assign({}, state, action.song)
    case RECEIVE_SONGS: 
      return Object.assign({}, action.songs)
    case DELETE_SONG: 
      let nextState = Object.assign({}, state)
      delete nextState[action.song.id]
      return nextState
    default: 
      return state;
  }
}

export default songReducer