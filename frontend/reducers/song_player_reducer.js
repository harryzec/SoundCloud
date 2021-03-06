import {
  SONG_PLAYING,
  SONG_PAUSED
} from '../actions/song_player_actions';
import { PLAY_RANDOM } from '../actions/song_action'

const SongPlayerReducer = (state= { player: 'paused', song: 'none'}, action) => {
  Object.freeze(state);

  switch(action.type) {
    case SONG_PLAYING:
      return { player: 'playing', song: action.song};
    case PLAY_RANDOM:
      return { player: 'playing', song: action.song};
    case SONG_PAUSED:
      return { player: 'paused', song: action.song};
    default:
      return state;
  }
}

export default SongPlayerReducer