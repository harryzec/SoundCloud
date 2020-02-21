import {RECEIVE_PLAYLISTS} from '../actions/playlist_actions'

const PlaylistReducer = (state= {}, action) => {

  Object.freeze(state);
  // debugger

  switch(action.type) {
    case RECEIVE_PLAYLISTS:
      return action.playlists
    default:
      return state;
  }
}

export default PlaylistReducer