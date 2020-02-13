import { connect } from 'react-redux';
import Discover from './discover';
import { logout } from '../../actions/session_actions';

const mSTP = (state) => ({
})

const mDTP = dispatch => ({
  logout: () => dispatch(logout())
})

export default connect(mSTP, mDTP)(Discover);