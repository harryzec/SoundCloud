import * as APIUtil from '../util/songs_api_util';

export const RECEIVE_SONG = 'RECEIVE_SONG';
export const CREATE_ERROR = 'CREATE_ERROR'

// export const receiveErrors = errors => ({
//   type: RECEIVE_SESSION_ERRORS,
//   errors
// });

export const receiveSong = song => ({
  type: RECEIVE_SONG,
  song
})

export const createSongErrors = (err) => ({
  type: CREATE_ERROR,
  err
})

export const fetchSong = (songId) => dispatch => {
  return APIUtil.fetchSong(songId).then(song =>(
    dispatch(receiveSong(song))
  ))
}

export const createSong = (song) => dispatch => {
  return APIUtil.createSong(song)
    .then
      (song => (
        dispatch(receiveSong(song), err => dispatch(createSongErrors(err)))
  ))
}