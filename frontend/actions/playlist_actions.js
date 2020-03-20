import * as APIUtil from '../util/playlist_util'

export const RECEIVE_PLAYLISTS = 'RECEIVE_PLAYLISTS';
export const RECEIVE_PLAYLIST = 'RECEIVE_PLAYLIST'

export const receivePlaylists = playlists => {
  return{
  type: RECEIVE_PLAYLISTS,
  playlists
}}

export const receivePlaylist = playlist => {
  debugger
  return {
    type: RECEIVE_PLAYLIST,
    playlist
  }
}

export const fetchPlaylists = () => dispatch => {
  return APIUtil.fetchPlaylists()
    .then(playlists => (
      dispatch(receivePlaylists(playlists))
  ));
};

export const fetchPlaylistByArtist = userId => dispatch => {
  debugger
  return APIUtil.fetchPlaylistByArtist(userId).then(playlists => (
      dispatch(receivePlaylists(playlists)), err => (
        dispatch(receivePlaylists({})
      ))
  ));
};


export const createPlaylist = (playlist, song) => dispatch => {
  debugger
  return APIUtil.createPlaylist(playlist, song)
    .then((playlist) => (
      dispatch(receivePlaylist(playlist))
    ))
}

export const createPlaylistTrack = playlisttrack => dispatch => {
  return APIUtil.createPlaylistTrack(playlisttrack)
}