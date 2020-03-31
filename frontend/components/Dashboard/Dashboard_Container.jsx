import { connect } from 'react-redux';
import Dashboard from './Dashboard';
import { fetchUser } from '../../actions/user_actions'
import { fetchSongsByArtist } from '../../actions/song_action'
import { playSong, pauseSong } from '../../actions/song_player_actions'
import { openEditModal, openPlaylistModal } from '../../actions/modal_actions'
import { createFollow, deleteFollow } from '../../actions/follow_action'
import { createLike, deleteLike } from '../../actions/like_action'
import { openEditPlaylistModal, openDeletePlaylistModal } from '../../actions/modal_actions';
import { addQueue } from '../../actions/queue_action'


const mSTP = (state, ownProps) => {
  return {
  user: state.entities.users[ownProps.match.params.username.split('-').join(' ')],
  songs: state.entities.songs,
  player: state.ui.SongPlayer,
  currentuser: state.session.currentUser,
  playlists: Object.values(state.entities.PlaylistReducer),
  dropdown: state.ui.PlaylistDropdown
  }
}

const mDTP = dispatch => ({
  openPlaylistModal: (modal, song) => dispatch(openPlaylistModal(modal, song)),
  fetchUser: (username) => dispatch(fetchUser(username)),
  fetchSongsByArtist: (userId) => dispatch(fetchSongsByArtist(userId)),
  openEditModal: (edit, song)=> dispatch(openEditModal(edit, song)),
  createFollow: (follow) => dispatch(createFollow(follow)),
  deleteFollow: (follow_id) => dispatch(deleteFollow(follow_id)),
  createLike: (like)=> dispatch(createLike(like)),
  deleteLike: (like_id) => dispatch(deleteLike(like_id)),
  openDeletePlaylistModal: (modal, playlist) => dispatch(openDeletePlaylistModal(modal, playlist)),
  openEditPlaylistModal: (modal, playlist) => dispatch(openEditPlaylistModal(modal, playlist)),
  pauseSong: (song) => dispatch(pauseSong(song)),
  addQueue: (songs) => dispatch(addQueue(songs)),
  playSong: (song) => dispatch(playSong(song)),
})

export default connect(mSTP, mDTP)(Dashboard)