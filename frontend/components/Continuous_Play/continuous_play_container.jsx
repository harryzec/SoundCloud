import SongShow from './continuous_play'
import { fetchSong } from '../../actions/song_action'
import { connect } from 'react-redux';
import { playSong, pauseSong,updateWave } from '../../actions/song_player_actions'
import {timer} from '../../actions/song_player_actions'
import { playedSong } from '../../actions/queue_action'
import { createLike, deleteLike } from '../../actions/like_action'
import { replaceQueue } from '../../actions/queue_action'


const mSTP = (state) => ({
  song: state.ui.SongPlayer.song,
  playingStatus: state.ui.SongPlayer.player,
  wave: state.ui.WaveReducer,
  queue: state.entities.Queue,
  currentuser: state.session.currentUser
})

const mDTP = dispatch => ({
  fetchSong: (songId => dispatch(fetchSong(songId))),
  playSong: ((song) => dispatch(playSong(song))),
  pauseSong: ((song) => dispatch(pauseSong(song))),
  timer: (time) => dispatch(timer(time)),
  updateWave: (dur) => dispatch(updateWave(dur)),
  playedSong: () => dispatch(playedSong()),
  createLike: (like)=> dispatch(createLike(like)),
  deleteLike: (like_id) => dispatch(deleteLike(like_id)),
  replaceQueue: (queue) => dispatch(replaceQueue(queue)),
  
})

export default connect(mSTP, mDTP)(SongShow)