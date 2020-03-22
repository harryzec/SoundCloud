import { connect } from "react-redux"
import SongShow from './song_show'
import { openDeleteModal } from '../../actions/modal_actions'
import { fetchSongShow} from '../../actions/song_action'
import { openEditModal } from '../../actions/modal_actions'
import { playSong, pauseSong } from '../../actions/song_player_actions'
import { fetchSongsByArtist, createComment } from '../../actions/song_action'

const mSTP = (state, ownProps) => {
  return ({ song: state.entities.songShow[ownProps.match.params.hyperlink],
          userId: state.session.currentUser.username,
          currentuser: state.session.currentUser,
          othersongs: Object.values(state.entities.songs),
          username: ownProps.match.params.username.split('-').join(' ') })
}

const mDTP = dispatch => {
  return ({
  fetchSongShow: (hyperlink, username) => dispatch(fetchSongShow(hyperlink, username)),
  openDeleteModal: (keyword)=> dispatch(openDeleteModal(keyword)),
  openEditModal: (edit, song)=> dispatch(openEditModal(edit, song)),
  playSong: (song) => dispatch(playSong(song)),
  fetchSongsByArtist: (userId) => dispatch(fetchSongsByArtist(userId)),
  createComment: (comment) => dispatch(createComment(comment))
  }) 
}

export default connect(mSTP, mDTP)(SongShow)