import { connect } from "react-redux"
import SongShow from './song_show'
import { openDeleteModal } from '../../actions/modal_actions'
import { fetchSongShow} from '../../actions/song_action'

const mSTP = (state, ownProps) => {
  return ({ song: state.entities.songShow[ownProps.match.params.hyperlink],
          userId: state.session.currentUser.username })
}

const mDTP = dispatch => {
  return ({
  fetchSongShow: (hyperlink, username) => dispatch(fetchSongShow(hyperlink, username)),
  openDeleteModal: (keyword)=> dispatch(openDeleteModal(keyword)) 
})}

export default connect(mSTP, mDTP)(SongShow)