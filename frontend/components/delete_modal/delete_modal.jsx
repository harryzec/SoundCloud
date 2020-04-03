import React from 'react';
import { closeDeleteModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import DeleteForm from './DeleteForm';
import { deleteSong } from '../../actions/song_action'
import { playSong, pauseSong } from '../../actions/song_player_actions'

function DeleteModal({modal, closeModal, song, deleteSong, userlink, playSong}) {
  // debugger
  if (!modal) {
    return null;
  }
  let component;
  switch (modal) {
    case 'open':
      component = <DeleteForm deleteSong={deleteSong} playsong={playSong} userlink={userlink} song={song} closeModal={closeModal}/>;
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
  modal: state.ui.delete_modal.modal,
  song: state.ui.delete_modal.song
})

const mDTP = dispatch => ({
    closeModal: () => dispatch(closeDeleteModal()),
    playSong: (song) => dispatch(playSong(song)),
    deleteSong: (song) => dispatch(deleteSong(song))
  })

export default connect(mSTP, mDTP)(DeleteModal);