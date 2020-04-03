import { SHOW_SONG, DELETE_SONG } from '../actions/song_action'

const songShow = (state = {}, action) => {
  Object.freeze(state);

  switch(action.type) {
    case SHOW_SONG:
      debugger
      return Object.assign({}, state, action.song)
    case DELETE_SONG:
        let nextState = Object.assign({}, state)
        delete nextState[action.song.hyperlink]
        return nextState
    default: 
      return state;
  }
}

export default songShow;