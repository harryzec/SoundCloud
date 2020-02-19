import { CREATE_SONG } from '../actions/song_action';

export default (state = {}, action) => {
  // debugger
  switch (action.type) {
    case CREATE_SONG:
      // let songId = action.song.id
      return action.song
    default:
      return state;
  }
}