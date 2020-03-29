import { connect } from 'react-redux';
import Dashboard from './Dashboard';
import { fetchUser } from '../../actions/user_actions'
import { fetchSongsByArtist } from '../../actions/song_action'
import { playSong, pauseSong } from '../../actions/song_player_actions'
import { openEditModal, openPlaylistModal } from '../../actions/modal_actions'
import { createFollow, deleteFollow } from '../../actions/follow_action'

const mSTP = (state, ownProps) => {
  return {
  user: state.entities.users[ownProps.match.params.username.split('-').join(' ')],
  songs: state.entities.songs,
  currentuser: state.session.currentUser,
  dropdown: state.ui.PlaylistDropdown
  }
}

const mDTP = dispatch => ({
  openPlaylistModal: (modal, song) => dispatch(openPlaylistModal(modal, song)),
  fetchUser: (username) => dispatch(fetchUser(username)),
  fetchSongsByArtist: (userId) => dispatch(fetchSongsByArtist(userId)),
  playSong: (song) => dispatch(playSong(song)),
  openEditModal: (edit, song)=> dispatch(openEditModal(edit, song)),
  createFollow: (follow) => dispatch(createFollow(follow)),
  deleteFollow: (follow_id) => dispatch(deleteFollow(follow_id)),
})

export default connect(mSTP, mDTP)(Dashboard)