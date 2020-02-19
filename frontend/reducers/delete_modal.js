import { OPEN_DELETE_MODAL, CLOSE_DELETE_MODAL } from '../actions/modal_actions';

export default function DeleteModalReducer(state = null, action) {
  // debugger
  switch (action.type) {
    case OPEN_DELETE_MODAL:
      return action.modal;
    case CLOSE_DELETE_MODAL:
      return null;
    default:
      return state;
  }
}
