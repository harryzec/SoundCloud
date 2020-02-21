import * as APIUtil from '../util/playlist_util'

export const RECEIVE_PLAYLISTS = 'RECEIVE_PLAYLISTS';

export const receivePlaylists = playlists => {
  return{
  type: RECEIVE_PLAYLISTS,
  playlists
}}

export const fetchPlaylists = () => dispatch => {
  return APIUtil.fetchPlaylists()
    .then(playlists => (
      dispatch(receivePlaylists(playlists))
  ));
};