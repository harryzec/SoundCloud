import { RECEIVE_CREATE_PLAYLIST } from '../actions/playlist_actions'

const PlaylistReducer = (state= {}, action) => {

  Object.freeze(state);
  // debugger

  switch(action.type) {
    case RECEIVE_CREATE_PLAYLIST:
      return action.playlist
    default:
      return {};
  }
}

export default PlaylistReducer