import { OPEN_EDIT_MODAL, CLOSE_EDIT_MODAL } from '../actions/modal_actions';

export default function EditModalReducer(state = { modal: null, song: null}, action) {
  // debugger
  switch (action.type) {
    case OPEN_EDIT_MODAL:
      return { modal: action.modal, song: action.song};
    case CLOSE_EDIT_MODAL:
    default:
      return { modal: null, song: null};
  }
}
