import { connect } from "react-redux"
import SongShow from './song_show'
import { openDeleteModal } from '../../actions/modal_actions'
import { fetchSongShow} from '../../actions/song_action'

const mSTP = (state, ownProps) => {
  // debugger
  // if (state.entities.songshow[ownProps.match.params.hyperlink] === undefined){
  //   return ({song: null})
  // } else {
  return ({ song: state.entities.songShow[ownProps.match.params.hyperlink] })
  // }
}

const mDTP = dispatch => {
  debugger
  return({
  fetchSongShow: (hyperlink, username) => dispatch(fetchSongShow(hyperlink, username)),
  openDeleteModal: (state)=> dispatch(openDeleteModal(state)) 
})}

export default connect(mSTP, mDTP)(SongShow)