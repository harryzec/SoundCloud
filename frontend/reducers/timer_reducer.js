import {
  TIMER
} from '../actions/song_player_actions';

const TimerReducer = (state = '0:00', action) => {
  Object.freeze(state);

  switch(action.type) {
    
    case TIMER:
      return action.time ;
    default:
      return state;
  }
}

export default TimerReducer