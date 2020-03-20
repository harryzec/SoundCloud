import {RECEIVE_PLAYLISTS, RECEIVE_PLAYLIST} from '../actions/playlist_actions'

const PlaylistReducer = (state= {}, action) => {

  Object.freeze(state);
  // debugger

  switch(action.type) {
    case RECEIVE_PLAYLISTS:
      return action.playlists
    case RECEIVE_PLAYLIST:
      return action.playlist
    default:
      return {};
  }
}

export default PlaylistReducer