import { SHOW_SONG } from '../actions/song_action'

const songShow = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case SHOW_SONG:
      return Object.assign({}, action.song)
    default: 
      return state;
  }
}

export default songShow;