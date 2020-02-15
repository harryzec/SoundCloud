import SongShow from './continuous_play'
import { fetchSong } from '../../actions/song_action'
import { connect } from 'react-redux';
import { playSong, pauseSong } from '../../actions/song_player_actions'

const mSTP = (state) => ({
  song: state.ui.SongPlayer.song,
  playingStatus: state.ui.SongPlayer.player
})

const mDTP = dispatch => ({
  fetchSong: (songId => dispatch(fetchSong(songId))),
  playSong: ((song) => dispatch(playSong(song))),
  pauseSong: ((song) => dispatch(pauseSong(song)))
})

export default connect(mSTP, mDTP)(SongShow)