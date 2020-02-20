import { connect } from "react-redux"
import SongShow from './song_show'
import { openDeleteModal } from '../../actions/modal_actions'
import { fetchSongShow} from '../../actions/song_action'
import { openEditModal } from '../../actions/modal_actions'

const mSTP = (state, ownProps) => {
  return ({ song: state.entities.songShow[ownProps.match.params.hyperlink],
          userId: state.session.currentUser.username,
          currentuser: state.session.currentUser,
          username: ownProps.match.params.username.split('-').join(' ') })
}

const mDTP = dispatch => {
  return ({
  fetchSongShow: (hyperlink, username) => dispatch(fetchSongShow(hyperlink, username)),
  openDeleteModal: (keyword)=> dispatch(openDeleteModal(keyword)),
  openEditModal: (edit, song)=> dispatch(openEditModal(edit, song)) 
})}

export default connect(mSTP, mDTP)(SongShow)