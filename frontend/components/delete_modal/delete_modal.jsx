import React from 'react';
import { closeDeleteModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import DeleteForm from './DeleteForm';
import { deleteSong } from '../../actions/song_action'

function DeleteModal({modal, closeModal, song, deleteSong, userlink}) {
  // debugger
  if (!modal) {
    return null;
  }
  let component;
  switch (modal) {
    case 'open':
      component = <DeleteForm deleteSong={deleteSong} userlink={userlink} song={song} closeModal={closeModal}/>;
      break;
    default:
      return null;
  }
  return (
    <div className="deletemodal-background" onClick={closeModal}>
      <div className="deletemodal-child" onClick={e => e.stopPropagation()}>
        { component }
      </div>
    </div>
  );
}

const mSTP = state => ({
  modal: state.ui.delete_modal
})

const mDTP = dispatch => ({
    closeModal: () => dispatch(closeDeleteModal()),
    deleteSong: (song) => dispatch(deleteSong(song))
  })

export default connect(mSTP, mDTP)(DeleteModal);