import React from 'react';
import { closePlaylistModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import PlaylistForm from './Playlist_Form'
import { createPlaylist } from '../../actions/playlist_actions'

function Modal({modal, closePlaylistModal, song, createPlaylist, currentUser}) {
  debugger
  if (!modal) {
    return null;
  }
  let component;
  switch (modal) {
    case 'playlist':
      component = <PlaylistForm song={song} currentUser={currentUser} createPlaylist={createPlaylist}/>;
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
    currentUser: state.session.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closePlaylistModal: () => dispatch(closePlaylistModal()),
    createPlaylist: (playlist) => dispatch(createPlaylist(playlist))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);