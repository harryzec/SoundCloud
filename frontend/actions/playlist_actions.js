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

export const RECEIVE_CREATE_PLAYLIST = 'RECEIVE_CREATE_PLAYLIST';

export const receiveCreatePlaylist = playlist => {
  debugger
  return {
    type: RECEIVE_CREATE_PLAYLIST,
    playlist
  }
}

export const CLOSE_EDIT_PLAYLIST_MODAL = 'CLOSE_EDIT_PLAYLIST_MODAL';


export const closeEditPlaylistModal = () => {
  return {
    type: CLOSE_EDIT_PLAYLIST_MODAL
  };
};


export const updatePlaylist = (playlist, id) => dispatch => {
  return APIUtil.updatePlaylist(playlist, id)
    .then(() => dispatch(closeEditPlaylistModal()))
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
      dispatch(receiveCreatePlaylist(playlist))
    ))
}

export const createPlaylistTrack = playlisttrack => dispatch => {
  return APIUtil.createPlaylistTrack(playlisttrack)
}

export const fetchPlaylist = (username, permalink) => dispatch => {
  debugger
  return APIUtil.getPlaylist(username, permalink)
    .then((playlist) => (dispatch(receivePlaylist(playlist))))
    // .catch(err => console.log(err))
}

export const deletePlaylistTrack = playlisttrack => dispatch => {
  return APIUtil.deletePlaylistTrack(playlisttrack)
}

export const deletePlaylist = playlist_id => dispatch => {
  return APIUtil.deletePlaylist(playlist_id)
}