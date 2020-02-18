import { combineReducers } from 'redux';
import modal from './modal_reducer';
import SongStatus from './song_player_reducer'
import delete_modal from './delete_modal'

export default combineReducers({
  modal,
  delete_modal: delete_modal,
  SongPlayer: SongStatus
});