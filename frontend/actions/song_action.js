import * as APIUtil from '../util/songs_api_util';

export const RECEIVE_SONG = 'RECEIVE_SONG';

export const receiveSong = song => ({
  type: RECEIVE_SONG,
  song
})

export const fetchSong = (songId) => dispatch => {
  return APIUtil.fetchSong(songId).then(song =>(
    dispatch(receiveSong(song))
  ))
}