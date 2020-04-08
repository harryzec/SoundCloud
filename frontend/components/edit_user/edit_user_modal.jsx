import React from 'react';
import { closeEditModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import EditUserForm from './edit_user_form';
import { editSong } from '../../actions/song_action'
import { closeUserModal } from '../../actions/modal_actions'
import { updateUser } from '../../actions/session_actions'


function EditModal({edit_modal, closeUserModal, currentuser, updateUser}) {
  
  if (!edit_modal) {
    return null;
  }
  let component;
  switch (edit_modal) {
    case 'edit_user':
      component = <EditUserForm currentuser={currentuser} closeUserModal={closeUserModal} updateUser = {updateUser}/>;
      break;
    default:
      return null;
  }
  return (
    <div className="edituser-background" onClick={closeUserModal}>
      <div className="edituser-child" onClick={e => e.stopPropagation()}>
        { component }
      </div>
    </div>
  );
}

const mSTP = state => {
  
  return {
    edit_modal: state.ui.editUser.modal,
    currentuser: state.session.currentUser
  };
};

const mDTP = dispatch => {
  return {
    closeUserModal: () => dispatch(closeUserModal()),
    updateUser: (user, id) => dispatch(updateUser(user, id))
  };
};

export default connect(mSTP, mDTP)(EditModal);