import React from 'react';
import { closeEditPlaylistModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import EditPlaylistForm from './edit_playlist_form';
import { updatePlaylist, deletePlaylistTrack, fetchPlaylistByArtist } from '../../actions/playlist_actions'


function EditModal({edit_modal, deletePlaylistTrack, fetchPlaylistByArtist, updatePlaylist, closeEditPlaylistModal,currentUser, current_user, playlist}) {
  debugger
  if (!edit_modal) {
    return null;
  }
  let component;
  switch (edit_modal) {
    case 'edit':
      component = <EditPlaylistForm playlist={playlist} fetchPlaylistByArtist={fetchPlaylistByArtist} deletePlaylistTrack={deletePlaylistTrack} currentUser={currentUser} updatePlaylist={updatePlaylist} current_user={current_user} closeEditPlaylistModal={closeEditPlaylistModal}/>;
      break;
    default:
      return null;
  }
  return (
    <div className="editmodal-background" onClick={closeEditPlaylistModal}>
      <div className="editmodal-child" onClick={e => e.stopPropagation()}>
        { component }
      </div>
    </div>
  );
}

const mSTP = state => {
  debugger
  return {
    edit_modal: state.ui.Edit_Playlist_Modal.modal,
    playlist: state.ui.Edit_Playlist_Modal.playlist,
    current_user: state.session.currentUser.username,
    currentUser: state.session.currentUser
  };
};

const mDTP = dispatch => {
  return {
    closeEditPlaylistModal: () => dispatch(closeEditPlaylistModal()),
    updatePlaylist: (playlist, id) => dispatch(updatePlaylist(playlist, id)),
    deletePlaylistTrack: (playlisttrack) => dispatch(deletePlaylistTrack(playlisttrack)),
    fetchPlaylistByArtist: (artist) => dispatch(fetchPlaylistByArtist(artist))
  };
};

export default connect(mSTP, mDTP)(EditModal);