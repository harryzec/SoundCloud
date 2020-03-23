import { OPEN_DELETE_PLAYLIST_MODAL, CLOSE_DELETE_PLAYLIST_MODAL } from '../actions/modal_actions';

export default function DeleteModalReducer(state = { modal: null, playlist: null}, action) {
  debugger
  switch (action.type) {
    case OPEN_DELETE_PLAYLIST_MODAL:
      return { modal: action.modal, playlist: action.playlist};
    case CLOSE_DELETE_PLAYLIST_MODAL :
    default:
      return { modal: null, playlist: null};
  }
}