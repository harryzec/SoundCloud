import { OPEN_MODAL, CLOSE_MODAL } from '../actions/modal_actions';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';

export default function modalReducer(state = null, action) {
  debugger
  switch (action.type) {
    case OPEN_MODAL:
      return action.modal;
    case RECEIVE_CURRENT_USER:
    case CLOSE_MODAL:
      return null;
    default:
      return state;
  }
}