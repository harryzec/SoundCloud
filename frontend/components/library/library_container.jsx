import { connect } from 'react-redux';
import Library from './library'

const mSTP = state => ({
  recentplays: Object.values(state.entities.recentplays),
  currentuser: state.session.currentUser
})

const mDTP = dispatch =>({

})

export default connect(mSTP, mDTP)(Library)