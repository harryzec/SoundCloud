import React from 'react';
import { closePlaylistModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import PlaylistForm from './Playlist_Form'
import { createPlaylist } from '../../actions/playlist_actions'
import { createPlaylistTrack, deletePlaylistTrack } from '../../actions/playlist_actions'
import { updateUser } from '../../actions/session_actions'
import { fetchSongsByArtist, fetchPopularSongs } from '../../actions/song_action'
import { fetchUser, fetchRecent} from '../../actions/user_actions'
import { fetchPlaylistByArtist } from '../../actions/playlist_actions'


function Modal({modal, fetchUser, fetchSongsByArtist, fetchPlaylistByArtist, fetchRecent, updateUser, deletePlaylistTrack, closePlaylistModal, song, playlist, createPlaylist, currentUser, createPlaylistTrack}) {
  
  if (!modal) {
    return null;
  }
  let component;
  switch (modal) {
    case 'playlist':
      component = <PlaylistForm closePlaylistModal={closePlaylistModal} deletePlaylistTrack={deletePlaylistTrack} song={song} updateUser={updateUser} playlist = {playlist} currentUser={currentUser} createPlaylistTrack ={createPlaylistTrack} createPlaylist={createPlaylist}/>;
      break;
    default:
      return null;
  }
  return (
    <div className="playlist-modal-background" onClick={() => {
      closePlaylistModal()
      // if (this.props.match.params.username.split('-').join(' ') === currentUser.username) {
      //   fetchUser(currentUser.username)
      //   fetchSongsByArtist(currentUser.username)
      //   fetchPlaylistByArtist(currentUser.username)
      //   fetchRecent(currentUser.username)
      // }
    }}>
      <div className="playlist-modal-child" onClick={e => e.stopPropagation()}>
        { component }
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    modal: state.ui.playlist_modal.modal,
    song: state.ui.playlist_modal.song,
    currentUser: state.session.currentUser,
    playlist: Object.values(state.entities.RecentPlaylist)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closePlaylistModal: () => dispatch(closePlaylistModal()),
    createPlaylist: (playlist, song) => dispatch(createPlaylist(playlist, song)),
    createPlaylistTrack: (playlisttrack) => dispatch(createPlaylistTrack(playlisttrack)),
    updateUser: (user, id) => dispatch(updateUser(user, id)),
    deletePlaylistTrack: (playlisttrack) => dispatch(deletePlaylistTrack(playlisttrack)),
    fetchUser: (username) => dispatch(fetchUser(username)),
    fetchSongsByArtist: (userId) => dispatch(fetchSongsByArtist(userId)),
    fetchPlaylistByArtist: (username) => dispatch(fetchPlaylistByArtist(username)),
    fetchRecent: (username) => dispatch(fetchRecent(username)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);