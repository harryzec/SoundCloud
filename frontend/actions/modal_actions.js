export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const openModal = (modal, email = '') => {
  // 
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

export const openDeleteModal = (modal, song) => {
  
  return {
    type: OPEN_DELETE_MODAL,
    modal,
    song
  };
};

export const OPEN_USER_MODAL = 'OPEN_USER_MODAL'
export const CLOSE_USER_MODAL = 'DELETE_USER_MODAL'

export const openUserModal = (modal) => {
  return {
    type: OPEN_USER_MODAL,
    modal
  };
};

export const closeUserModal = () => {
  return {
    type: CLOSE_USER_MODAL,
  };
}


export const closeDeleteModal = () => {
  return {
    type: CLOSE_DELETE_MODAL
  };
};

export const OPEN_EDIT_PLAYLIST_MODAL = 'OPEN_EDIT_PLAYLIST_MODAL';
export const CLOSE_EDIT_PLAYLIST_MODAL = 'CLOSE_EDIT_PLAYLIST_MODAL';

export const openEditPlaylistModal = (modal, playlist) => {
  
  return {
    type: OPEN_EDIT_PLAYLIST_MODAL,
    modal,
    playlist
  };
};

export const closeEditPlaylistModal = () => {
  return {
    type: CLOSE_EDIT_PLAYLIST_MODAL
  };
};

export const OPEN_EDIT_MODAL = 'OPEN_EDIT_MODAL';
export const CLOSE_EDIT_MODAL = 'CLOSE_EDIT_MODAL';

export const openEditModal = (modal, song) => {
  
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

export const OPEN_PLAYLIST_MODAL = 'OPEN_PLAYLIST_MODAL';
export const CLOSE_PLAYLIST_MODAL = 'CLOSE_PLAYLIST_MODAL';


export const openPlaylistModal = (modal, song) => {
  
  return {
    type: OPEN_PLAYLIST_MODAL, 
    modal, 
    song
  }
}

export const OPEN_DELETE_PLAYLIST_MODAL = 'OPEN_DELETE_PLAYLIST_MODAL'
export const CLOSE_DELETE_PLAYLIST_MODAL = 'CLOSE_DELETE_PLAYLIST_MODAL'

export const openDeletePlaylistModal = (modal, playlist) => {
  
  return {
    type: OPEN_DELETE_PLAYLIST_MODAL,
    modal,
    playlist
  }
}

export const closeDeletePlaylistModal = () => {
  return {
  type: CLOSE_DELETE_PLAYLIST_MODAL
}}

export const closePlaylistModal = () => {
  return {
    type: CLOSE_PLAYLIST_MODAL
  }
}