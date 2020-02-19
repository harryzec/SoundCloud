import { connect } from 'react-redux';
import Dashboard from './Dashboard';
import { fetchUser } from '../../actions/user_actions'
import { fetchSongsByArtist } from '../../actions/song_action'
import { playSong, pauseSong } from '../../actions/song_player_actions'
import { openEditModal } from '../../actions/modal_actions'

const mSTP = (state, ownProps) => {
  // debugger
  return {
  user: state.entities.users[ownProps.match.params.username],
  songs: state.entities.songs,
  currentuser: state.session.currentUser
  }
}

const mDTP = dispatch => ({
  fetchUser: (username) => dispatch(fetchUser(username)),
  fetchSongsByArtist: (userId) => dispatch(fetchSongsByArtist(userId)),
  playSong: (song) => dispatch(playSong(song)),
  openEditModal: (edit, song)=> dispatch(openEditModal(edit, song)) 
})

export default connect(mSTP, mDTP)(Dashboard)