import { OPEN_DELETE_MODAL, CLOSE_DELETE_MODAL } from '../actions/modal_actions';

export default function DeleteModalReducer(state = {modal: null, song: null }, action) {
  switch (action.type) {
    case OPEN_DELETE_MODAL:
      return { modal: action.modal, song: action.song }
    case CLOSE_DELETE_MODAL:
      return { modal: null, song: null }
    default:
      return state;
  }
}
