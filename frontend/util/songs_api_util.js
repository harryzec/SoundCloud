export const fetchSong = (songId) => (
  $.ajax({
    url: `/api/songs/${songId}`
  })
)

export const createSong = (song) => {
  debugger
  return $.ajax({
    method: 'POST',
    url: '/api/songs',
    data: song,
    processData: false,
    contentType: false
  })
}

export const fetchSongShow = (hyperlink, username) => {
  return $.ajax({
    method: 'GET',
    url: `/api/songs/songshow/${username}/${hyperlink}`,
  })
}

export const fetchSongsByArtist = userId => {
  return $.ajax({
      method: 'GET',
      url: `/api/songs/by_user/${userId}`,
  });
}