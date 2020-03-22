import PlaylistShow from './playlist_show'
import { connect } from 'react-redux';
import { fetchPlaylist } from '../../actions/playlist_actions'

const mSTP = state => {
  return{

  }
}

const mDTP = dispatch => {
  return{
    fetchPlaylist: (username, permalink) => dispatch(fetchPlaylist(username, permalink))
  }
}

export default connect(mSTP, mDTP)(PlaylistShow)