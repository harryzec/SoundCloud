import React from 'react';
import { closeDeleteModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import DeleteForm from './DeleteForm';

function DeleteModal({modal, closeModal}) {
  debugger
  if (!modal) {
    return null;
  }
  let component;
  switch (modal) {
    case 'open':
      component = <DeleteForm />;
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

const mapStateToProps = state => {
  return {
    modal: state.ui.delete_modal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeDeleteModal()),
    deleteSong: (hyperlink, user) => dispatch(deleteSong(hyperlink, user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteModal);