import SearchPage from './search'
import { connect } from 'react-redux';
import { fetchSearch } from '../../actions/search_actions'
import { createFollow, deleteFollow } from '../../actions/follow_action'
import { createLike, deleteLike } from '../../actions/like_action'
import { openPlaylistModal } from '../../actions/modal_actions'





const mSTP = state => {

  return{
    search: Object.values(state.entities.searched),
    currentuser: state.session.currentUser
  }
}

const mDTP = dispatch => {
  return {fetchSearch: (search)=> dispatch(fetchSearch(search)),
      createFollow: (follow) => dispatch(createFollow(follow)),
      deleteFollow: (follow_id) => dispatch(deleteFollow(follow_id)),
      fetchSearch: (search)=> dispatch(fetchSearch(search)),
      createLike: (like)=> dispatch(createLike(like)),
      deleteLike: (like_id) => dispatch(deleteLike(like_id)),
      openPlaylistModal: (modal, song) => dispatch(openPlaylistModal(modal, song))
    }
}

export default connect(mSTP, mDTP)(SearchPage)