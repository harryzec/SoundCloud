import React from 'react';
import { closePlaylistModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import PlaylistForm from './Playlist_Form'
import { createPlaylist } from '../../actions/playlist_actions'
import { createPlaylistTrack } from '../../actions/playlist_actions'

function Modal({modal, closePlaylistModal, song, playlist, createPlaylist, currentUser, createPlaylistTrack}) {
  
  if (!modal) {
    return null;
  }
  let component;
  switch (modal) {
    case 'playlist':
      component = <PlaylistForm song={song} playlist = {playlist} currentUser={currentUser} createPlaylistTrack ={createPlaylistTrack} createPlaylist={createPlaylist}/>;
      break;
    default:
      return null;
  }
  return (
    <div className="playlist-modal-background" onClick={closePlaylistModal}>
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
    createPlaylistTrack: (playlisttrack) => dispatch(createPlaylistTrack(playlisttrack))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);