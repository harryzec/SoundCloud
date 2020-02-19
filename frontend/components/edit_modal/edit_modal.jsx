import React from 'react';
import { closeEditModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import EditForm from './edit_form';
import { editSong } from '../../actions/song_action'

function EditModal({edit_modal, closeEditModal, song, EditSong, current_user, artistSongs}) {
  debugger
  if (!edit_modal) {
    return null;
  }
  let component;
  switch (edit_modal) {
    case 'edit':
      component = <EditForm song={song} editSong={EditSong} artistSongs={artistSongs} current_user={current_user} closeEditModal={closeEditModal}/>;
      break;
    default:
      return null;
  }
  return (
    <div className="editmodal-background" onClick={closeEditModal}>
      <div className="editmodal-child" onClick={e => e.stopPropagation()}>
        { component }
      </div>
    </div>
  );
}

const mSTP = state => {
  debugger
  return {
    edit_modal: state.ui.edit_modal.modal,
    song: state.ui.edit_modal.song,
    current_user: state.session.currentUser.username,
    editSong: {
      title: '',
      genre: null,
      hyperlink: null,
      description: ''
    },
    artistSongs: Object.values(state.entities.songs)

  };
};

const mDTP = dispatch => {
  return {
    closeEditModal: () => dispatch(closeEditModal()),
    EditSong: (song, id) => dispatch(editSong(song, id))
  };
};

export default connect(mSTP, mDTP)(EditModal);