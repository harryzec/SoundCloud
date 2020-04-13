import SearchPage from './search'
import { connect } from 'react-redux';
import { fetchSearch } from '../../actions/search_actions'
import { createFollow, deleteFollow } from '../../actions/follow_action'
import { createLike, deleteLike } from '../../actions/like_action'
import { openPlaylistModal } from '../../actions/modal_actions'
import { addQueue } from '../../actions/queue_action'
import { playSong, pauseSong } from '../../actions/song_player_actions'






const mSTP = state => {

  return{
    search: Object.values(state.entities.searched),
    currentuser: state.session.currentUser,
    player: state.ui.SongPlayer
  }
}

const mDTP = dispatch => {
  return {fetchSearch: (search)=> dispatch(fetchSearch(search)),
      playSong: (song) => dispatch(playSong(song)),
      pauseSong: (song) => dispatch(pauseSong(song)),
      createFollow: (follow) => dispatch(createFollow(follow)),
      deleteFollow: (follow_id) => dispatch(deleteFollow(follow_id)),
      fetchSearch: (search)=> dispatch(fetchSearch(search)),
      createLike: (like)=> dispatch(createLike(like)),
      deleteLike: (like_id) => dispatch(deleteLike(like_id)),
      openPlaylistModal: (modal, song) => dispatch(openPlaylistModal(modal, song)),
      addQueue: (songs) => dispatch(addQueue(songs)),
      openPlaylistModal: (modal, song) => dispatch(openPlaylistModal(modal, song)),
    }
}

export default connect(mSTP, mDTP)(SearchPage)