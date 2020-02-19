import { OPEN_MODAL, CLOSE_MODAL } from '../actions/modal_actions';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';

export default function modalReducer(state = {modal: null, email: ''}, action) {
  // debugger
  switch (action.type) {
    case OPEN_MODAL:
      return {modal: action.modal, email: action.email}
    case RECEIVE_CURRENT_USER:
    case CLOSE_MODAL:
      return {type: null};
    default:
      return state;
  }
}