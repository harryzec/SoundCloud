import { combineReducers } from 'redux';
import modal from './modal_reducer';
import SongStatus from './song_player_reducer'
import delete_modal from './delete_modal'
import edit_modal from './edit_modal'
import PlaylistModalReducer from './playlist_modal'
import PlaylistDropdown from './dropdown'
import EditPlaylistModalReducer from './edit_playlist_modal'
import DeletePlaylistModal from './delete_playlist_modal'
import TIMER from './timer_reducer'
import WaveReducer from './wave_reducer'
import updateWave from './update_wave'
import FollowReducer from './follow_reducer';

export default combineReducers({
  modal,
  delete_modal: delete_modal,
  edit_modal: edit_modal,
  playlist_modal: PlaylistModalReducer,
  SongPlayer: SongStatus,
  SongTimer: TIMER,
  PlaylistDropdown: PlaylistDropdown,
  Edit_Playlist_Modal: EditPlaylistModalReducer,
  delete_playlist_modal: DeletePlaylistModal,
  WaveReducer: WaveReducer,
  updateWave: updateWave,
  follows: FollowReducer
});