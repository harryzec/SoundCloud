import Stream from './stream'
import { connect } from 'react-redux';
import { fetchSong } from '../../actions/song_action';
import { playSong, pauseSong } from '../../actions/song_player_actions'
import { fetchPlaylists } from '../../actions/playlist_actions'
import { fetchRandomUsers, fetchFollowerContent } from '../../actions/user_actions'
import { createFollow, deleteFollow } from '../../actions/follow_action'
import { createLike, deleteLike } from '../../actions/like_action'


export const mSTP = state => ({
  recentplays: Object.values(state.entities.recentplays),
  content: Object.values(state.entities.content),
  currentuser: state.session.currentUser,
  mightlike: Object.values(state.entities.randomUsers),
  follows: Object.values(state.ui.follows)
})
export const mDTP = state => ({
  currentSong: (song) => dispatch(currentSong(song)),
  playSong: (song) => dispatch(playSong(song)),
  fetchSong: songId => dispatch(fetchSong(songId)),
  fetchPlaylists: () => dispatch(fetchPlaylists()),
  suggestedFollows: () => dispatch(fetchRandomUsers()),
  createFollow: (follow) => dispatch(createFollow(follow)),
  deleteFollow: (follow_id) => dispatch(deleteFollow(follow_id)),
  fetchFollowerContent: (id) => dispatch(fetchFollowerContent(id)),
  createLike: (like)=> dispatch(createLike(like)),
  deleteLike: (like_id) => dispatch(deleteLike(like_id)),
})

export default connect(mSTP, mDTP)(Stream)