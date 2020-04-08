import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { openModal } from '../../actions/modal_actions';
import Greeting from './greeting';
import { fetchSearch } from '../../actions/search_actions'
import { fetchPlaylists } from '../../actions/playlist_actions'

const mapStateToProps = (state) => ({
  currentUser: state.session.currentUser,
  playlists: Object.values(state.entities.PlaylistReducer),
  search: Object.values(state.entities.searched)
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  openModal: modal => dispatch(openModal(modal)),
  fetchPlaylists: () => dispatch(fetchPlaylists()),
  fetchSearch: (search)=> dispatch(fetchSearch(search))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Greeting);
