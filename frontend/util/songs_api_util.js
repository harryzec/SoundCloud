export const fetchSong = (songId) => (
  $.ajax({
    url: `/api/songs/${songId}`
  })
)

export const deleteSong = ( songId ) => (
  $.ajax({
    method: 'DELETE',
    url: `/api/songs/${songId}/`
  })
)

export const createSong = (song) => {
  // debugger
  return $.ajax({
    method: 'POST',
    url: '/api/songs',
    data: song,
    processData: false,
    contentType: false
  })
}

export const fetchSongShow = (hyperlink, username) => {
  debugger
  return $.ajax({
    method: 'GET',
    url: `/api/songs/songshow/${username}/${hyperlink}`
  })
}

export const fetchSongsByArtist = userId => {
  return $.ajax({
      method: 'GET',
      url: `/api/songs/by_user/${userId}`,
  });
}

export const editSong = (song, id) => {
  debugger
  return $.ajax({
    method: 'PATCH',
    url: `/api/songs/${id}`,
    data: song,
    processData: false,
    contentType: false
  })
}

export const createComment = (comment) => {
  return $.ajax({
    method: 'POST',
    url: '/api/comments',
    data: comment
  })
}