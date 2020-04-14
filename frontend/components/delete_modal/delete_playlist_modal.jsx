import React from 'react';
import { closeDeletePlaylistModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import { deletePlaylist, fetchPlaylistByArtist } from '../../actions/playlist_actions'
import DeletePlaylistForm from './delete_playlist_form';

function DeleteModal({modal, closeModal, playlist, deletePlaylist, fetchPlaylistByArtist}) {
  
  if (!modal) {
    return null;
  }
  let component;
  switch (modal) {
    case 'open':
      component = <DeletePlaylistForm fetchPlaylistByArtist={fetchPlaylistByArtist} deletePlaylist={deletePlaylist} playlist={playlist} closeModal={closeModal}/>;
      break;
    default:
      return null;
  }
  return (
    <div className="deleteplaylistmodal-background" onClick={closeModal}>
      <div className="deleteplaylistmodal-child" onClick={e => e.stopPropagation()}>
        { component }
      </div>
    </div>
  );
}

const mSTP = state => ({
  modal: state.ui.delete_playlist_modal.modal,
  playlist: state.ui.delete_playlist_modal.playlist
})

const mDTP = dispatch => ({
    closeModal: () => dispatch(closeDeletePlaylistModal()),
    deletePlaylist: (playlist_id) => dispatch(deletePlaylist(playlist_id)),
    fetchPlaylistByArtist: (userId) => dispatch(fetchPlaylistByArtist(userId)),
  })

export default connect(mSTP, mDTP)(DeleteModal);