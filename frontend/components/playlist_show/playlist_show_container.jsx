import PlaylistShow from './playlist_show'
import { connect } from 'react-redux';
import { fetchPlaylist } from '../../actions/playlist_actions'
import { openEditPlaylistModal, openDeletePlaylistModal } from '../../actions/modal_actions';
import { playSong, pauseSong, waveClick } from '../../actions/song_player_actions'
import { addQueue } from '../../actions/queue_action'
import { createLike, deleteLike } from '../../actions/like_action'




const mSTP = state => {
  return{
    playlist: Object.values(state.entities.PlaylistReducer)[0],
    tracks: Object.values(state.entities.PlaylistReducer)[0].tracks,
    currentuser: state.session.currentUser,
    player: state.ui.SongPlayer,
    time: state.ui.SongTimer,
    waveUpdate: state.ui.updateWave
  }
}

const mDTP = dispatch => {
  return{
    openEditPlaylistModal: (modal, playlist) => dispatch(openEditPlaylistModal(modal, playlist)),
    openDeletePlaylistModal: (modal, playlist) => dispatch(openDeletePlaylistModal(modal, playlist)),
    fetchPlaylist: (username, permalink) => dispatch(fetchPlaylist(username, permalink)),
    pauseSong: (song) => dispatch(pauseSong(song)),
    addQueue: (songs) => dispatch(addQueue(songs)),
    playSong: (song) => dispatch(playSong(song)),
    waveEvent: (event) => dispatch(waveClick(event)),
    createLike: (like)=> dispatch(createLike(like)),
    deleteLike: (like_id) => dispatch(deleteLike(like_id)),
  }
}

export default connect(mSTP, mDTP)(PlaylistShow)