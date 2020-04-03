import { connect } from 'react-redux';
import Library from './library'
import { updateUser } from '../../actions/session_actions'
import { createFollow, deleteFollow } from '../../actions/follow_action'



const mSTP = state => ({
  recentplays: Object.values(state.entities.recentplays),
  currentuser: state.session.currentUser
})

const mDTP = dispatch =>({
  updateUser: (user) => dispatch(updateUser(user)),
  createFollow: (follow) => dispatch(createFollow(follow)),
  deleteFollow: (follow_id) => dispatch(deleteFollow(follow_id)),
})

export default connect(mSTP, mDTP)(Library)