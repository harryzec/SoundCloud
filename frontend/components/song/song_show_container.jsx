import SongShow from './song_show'
import { fetchSong } from '../../actions/song_action'
import { connect } from 'react-redux';

const mSTP = (state) => {
  debugger
    if (state.entities.songs[2]){
      return ({song: state.entities.songs[2] })
    }
    else {
      return {}
    }
}

const mDTP = dispatch => ({
  fetchSong: (songId => dispatch(fetchSong(songId)))
})

export default connect(mSTP, mDTP)(SongShow)