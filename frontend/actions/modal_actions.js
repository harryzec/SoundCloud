export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const openModal = (modal, email = '') => {
  // debugger
  return {
    type: OPEN_MODAL,
    modal,
    email
  };
};

export const closeModal = () => {
  return {
    type: CLOSE_MODAL
  };
};

export const OPEN_DELETE_MODAL = 'OPEN_DELETE_MODAL';
export const CLOSE_DELETE_MODAL = 'CLOSE_DELETE_MODAL';

export const openDeleteModal = modal => {
  // debugger
  return {
    type: OPEN_DELETE_MODAL,
    modal
  };
};

export const closeDeleteModal = () => {
  return {
    type: CLOSE_DELETE_MODAL
  };
};

export const OPEN_EDIT_MODAL = 'OPEN_EDIT_MODAL';
export const CLOSE_EDIT_MODAL = 'CLOSE_EDIT_MODAL';

export const openEditModal = (modal, song) => {
  debugger
  return {
    type: OPEN_EDIT_MODAL,
    modal,
    song
  };
};

export const closeEditModal = () => {
  return {
    type: CLOSE_EDIT_MODAL
  };
};
