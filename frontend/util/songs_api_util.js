export const fetchSong = (songId) => (
  $.ajax({
    url: `/api/songs/${songId}`
  })
)

export const randomSong = () => {
  $.ajax({
    method: 'GET',
    url: '/api/songs/random'
  })
}

export const deleteSong = ( songId ) => (
  $.ajax({
    method: 'DELETE',
    url: `/api/songs/${songId}/`
  })
)

export const createSong = (song) => {
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
  return $.ajax({
    method: 'PATCH',
    url: `/api/songs/${id}`,
    data: song,
    processData: false,
    contentType: false
  })
}

export const fetchPopularSongs = (username) => {
  return $.ajax({
      method: 'GET',
      url: `/api/songs/by_user/popular/${username}`,
  });
}

export const updateSong = (song, id) => {
  return $.ajax({
    method: 'PATCH',
    url: `/api/songs/${id}`,
    data: {song}
  })
}

export const createComment = (comment) => {
  return $.ajax({
    method: 'POST',
    url: '/api/comments',
    data: comment
  })
}

export const deleteComment = (id) => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/comments/${id}'`
  })
}