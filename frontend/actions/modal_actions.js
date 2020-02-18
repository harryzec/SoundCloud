export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const openModal = (modal, email = '') => {
  debugger
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
