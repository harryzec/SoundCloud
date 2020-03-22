import * as APIUtil from '../util/songs_api_util';

export const RECEIVE_SONG = 'RECEIVE_SONG';
export const CREATE_ERROR = 'CREATE_ERROR';
export const CREATE_SONG = 'CREATE_SONG';
export const RECEIVE_SONGS = 'RECEIVE_SONGS';

// export const receiveErrors = errors => ({
//   type: RECEIVE_SESSION_ERRORS,
//   errors
// });

export const createnewSong = song => ({
  type: CREATE_SONG,
  song
})

export const receiveSongs = songs => {
  debugger
  return{
  type: RECEIVE_SONGS,
  songs
}}

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
        dispatch(createnewSong(song), err => dispatch(createSongErrors(err)))
  ))
}

export const fetchSongsByArtist = userId => dispatch => {
  return APIUtil.fetchSongsByArtist(userId).then(songs => (
      dispatch(receiveSongs(songs))
  ));
};

export const DELETE_SONG= 'DELETE_SONG';

export const removeSong = song => ({
  type: DELETE_SONG,
  song
})

export const deleteSong = ( song ) => dispatch => {
  return APIUtil.deleteSong(song.id)
    .then(()=> dispatch(removeSong(song)))
}

export const SHOW_SONG = 'SHOW_SONG';

export const songShow = song => ({
  type: SHOW_SONG,
  song
})

export const fetchSongShow = ( hyperlink, username ) => dispatch => {
  // debugger
  return APIUtil.fetchSongShow( hyperlink, username )
    .then((song) => { 
      debugger
      dispatch(songShow(song))
    })
}

export const editSong = (song, id) => dispatch => {
  return APIUtil.editSong(song, id)
    .then(song => receiveSong(song))
}

export const createComment = (comment) => dispatch => {
  return APIUtil.createComment(comment)
}