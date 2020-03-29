import {
  UPDATE_WAVE
} from '../actions/song_player_actions';

const WaveReducer = (state= 'none', action) => {
  Object.freeze(state);

  switch(action.type) {
    case UPDATE_WAVE:
      return action.time;
    default:
      return state;
  }
}

export default WaveReducer