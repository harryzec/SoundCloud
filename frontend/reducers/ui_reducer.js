import { combineReducers } from 'redux';
import modal from './modal_reducer';
import SongStatus from './song_player_reducer'

export default combineReducers({
  modal,
  SongPlayer: SongStatus
});