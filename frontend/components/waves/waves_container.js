import { connect } from "react-redux"
import waves from './waves'
import { playSong, pauseSong, waveClick } from '../../actions/song_player_actions'

const mSTP = (state, ownProps) => {
  return ({
          player: state.ui.SongPlayer,
          time: state.ui.SongTimer,
          waveUpdate: state.ui.updateWave
        })
          
}

const mDTP = dispatch => {
  return ({

  playSong: (song) => dispatch(playSong(song)),
  pauseSong: (song) => dispatch(pauseSong(song)),
  waveEvent: (event) => dispatch(waveClick(event))
  }) 
}

export default connect(mSTP, mDTP)(waves)