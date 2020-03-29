import { OPEN_EDIT_PLAYLIST_MODAL, CLOSE_EDIT_PLAYLIST_MODAL } from '../actions/modal_actions';

export default function EditModalReducer(state = { modal: null, playlist: null}, action) {
  
  switch (action.type) {
    case OPEN_EDIT_PLAYLIST_MODAL:
      return { modal: action.modal, playlist: action.playlist};
    case CLOSE_EDIT_PLAYLIST_MODAL:
    default:
      return { modal: null, playlist: null};
  }
}
