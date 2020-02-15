import { connect } from 'react-redux';
import Discover from './discover';
import { logout } from '../../actions/session_actions';
import { fetchSong } from '../../actions/song_action';
import { playSong, pauseSong } from '../../actions/song_player_actions'

const mSTP = (state) => {
  if (state.entities.songs[2]){
      return ({song: state.entities.songs[2] })
    }
    else {
      return {}
    }
}

const mDTP = dispatch => ({
  logout: () => dispatch(logout()),
  currentSong: (song) => dispatch(currentSong(song)),
  playSong: (song) => dispatch(playSong(song)),
  fetchSong: songId => dispatch(fetchSong(songId)),
})

export default connect(mSTP, mDTP)(Discover);