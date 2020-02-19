import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import LoginFormContainer from '../session/login_form_container';
import SignupFormContainer from '../session/signup_form_container';
import VerifyUserContainer from '../session/verify_user_container';

function Modal({currentModal, closeModal, email}) {
  if (!currentModal) {
    return null;
  }
  
  let component;
  switch (currentModal) {
    case 'login':
      component = <LoginFormContainer email={email}/>;
      break;
    case 'signup':
      component = <SignupFormContainer email={email}/>;
      break;
    case 'verifyUsername':
      component = <VerifyUserContainer/>;
      break;
    default:
      return null;
  }
  return (
    <div className="modal-background" onClick={closeModal}>
      <div className="modal-child" onClick={e => e.stopPropagation()}>
        { component }
      </div>
    </div>
  );
}

const mSTP = state => {
  // debugger
  return {
    currentModal: state.ui.modal.modal,
    email: state.ui.modal.email
  };
};

const mDTP = dispatch => {
  return {
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mSTP, mDTP)(Modal);