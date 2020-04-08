import { connect } from "react-redux"
import SongShow from './song_show'
import { createLike, deleteLike } from '../../actions/like_action'
import { openDeleteModal } from '../../actions/modal_actions'
import { fetchSongShow} from '../../actions/song_action'
import { openEditModal, openPlaylistModal } from '../../actions/modal_actions'
import { addQueue } from '../../actions/queue_action'
import { playSong, pauseSong, waveClick } from '../../actions/song_player_actions'
import { fetchSongsByArtist, createComment, deleteComment } from '../../actions/song_action'

const mSTP = (state, ownProps) => {
  return ({ song: state.entities.songShow[ownProps.match.params.hyperlink],
          currentuser: state.session.currentUser,
          othersongs: Object.values(state.entities.songs),
          username: ownProps.match.params.username.split('-').join(' '),
          player: state.ui.SongPlayer,
          time: state.ui.SongTimer,
          waveUpdate: state.ui.updateWave
        })
          
}

const mDTP = dispatch => {
  return ({
  fetchSongShow: (hyperlink, username) => dispatch(fetchSongShow(hyperlink, username)),
  openDeleteModal: (status, song)=> dispatch(openDeleteModal(status, song)),
  openEditModal: (edit, song)=> dispatch(openEditModal(edit, song)),
  playSong: (song) => dispatch(playSong(song)),
  pauseSong: (song) => dispatch(pauseSong(song)),
  fetchSongsByArtist: (userId) => dispatch(fetchSongsByArtist(userId)),
  createComment: (comment) => dispatch(createComment(comment)),
  deleteComment: (id) => dispatch(deleteComment(id)),
  createLike: (like)=> dispatch(createLike(like)),
  deleteLike: (like_id) => dispatch(deleteLike(like_id)),
  waveEvent: (event) => dispatch(waveClick(event)),
  addQueue: (songs) => dispatch(addQueue(songs)),
  openPlaylistModal: (modal, song) => dispatch(openPlaylistModal(modal, song)),
  }) 
}

export default connect(mSTP, mDTP)(SongShow)