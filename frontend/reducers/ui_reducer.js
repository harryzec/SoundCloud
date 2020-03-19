import { combineReducers } from 'redux';
import modal from './modal_reducer';
import SongStatus from './song_player_reducer'
import delete_modal from './delete_modal'
import edit_modal from './edit_modal'
import PlaylistModalReducer from './playlist_modal'
import PlaylistDropdown from './dropdown'

export default combineReducers({
  modal,
  delete_modal: delete_modal,
  edit_modal: edit_modal,
  playlist_modal: PlaylistModalReducer,
  SongPlayer: SongStatus,
  PlaylistDropdown: PlaylistDropdown
});