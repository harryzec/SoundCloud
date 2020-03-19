export const fetchPlaylists = () => (
  $.ajax({
    url: '/api/playlists'
  })
)

export const createPlaylist = (playlist) => (
  $.ajax({
    method: 'POST',
    url: '/api/playlists',
    data: playlist,
    processData: false,
    contentType: false
  })
)

export const fetchPlaylistByArtist = userId => {
  debugger
  return $.ajax({
      method: 'GET',
      url: `/api/playlists/by_user/${userId}`
  });
}