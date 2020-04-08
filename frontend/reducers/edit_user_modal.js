import { OPEN_USER_MODAL, CLOSE_USER_MODAL } from '../actions/modal_actions';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';

export default function modalReducer(state = {modal: null}, action) {
  switch (action.type) {
    case OPEN_USER_MODAL:
      return {modal: action.modal}
    case CLOSE_USER_MODAL:
      return {modal: null}
    default:
      return state;
  }
}