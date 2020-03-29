import { OPEN_PLAYLIST_MODAL, CLOSE_PLAYLIST_MODAL } from '../actions/modal_actions'

const PlaylistModalReducer = (state = {modal: null}, action) => {
  switch (action.type) {
    case OPEN_PLAYLIST_MODAL:
      return {modal: action.modal, song: action.song};
    case CLOSE_PLAYLIST_MODAL:
      return {modal: null};
    default:
      return state;
  }
}

export default PlaylistModalReducer