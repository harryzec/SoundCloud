import { connect } from 'react-redux';
import Discover from './discover';
import { logout } from '../../actions/session_actions';
import { fetchSong } from '../../actions/song_action';
import { playSong, pauseSong } from '../../actions/song_player_actions'
import { fetchPlaylists } from '../../actions/playlist_actions'

const mSTP = (state) => ({ 
  recentplays: Object.values(state.entities.recentplays),
  playlists: Object.values(state.entities.PlaylistReducer),
  currentuser: state.session.currentUser
})


const mDTP = dispatch => ({
  logout: () => dispatch(logout()),
  currentSong: (song) => dispatch(currentSong(song)),
  playSong: (song) => dispatch(playSong(song)),
  fetchSong: songId => dispatch(fetchSong(songId)),
  fetchPlaylists: () => dispatch(fetchPlaylists())
})

export default connect(mSTP, mDTP)(Discover);