import {
  EVENT
} from '../actions/song_player_actions';

const WaveReducer = (state= 'none', action) => {
  // debugger
  Object.freeze(state);

  switch(action.type) {
    case EVENT:
      return action.event;
    default:
      return state;
  }
}

export default WaveReducer