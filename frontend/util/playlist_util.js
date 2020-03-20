export const fetchPlaylists = () => (
  $.ajax({
    url: '/api/playlists'
  })
)

export const createPlaylist = (playlist, song) => {
  debugger
  return $.ajax({
    method: 'POST',
    url: '/api/playlists',
    data: playlist,
    processData: false,
    contentType: false
  })
}

export const fetchPlaylistByArtist = userId => {
  debugger
  return $.ajax({
      method: 'GET',
      url: `/api/playlists/by_user/${userId}`
  });
}

export const createPlaylistTrack = playlisttrack => {
  $.ajax({
    method: 'POST',
    url: '/api/playlist_tracks',
    data: playlisttrack,
    processData: false,
    contentType: false
  })
}