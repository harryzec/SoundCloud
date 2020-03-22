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

export const updatePlaylist = (playlist, id) => {
  debugger
  return $.ajax({
    method: 'PATCH',
    url: `/api/playlists/${id}`,
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

export const deletePlaylistTrack = (playlisttrack) => {
  $.ajax({
    method: "DELETE",
    url: '/api/playlist_tracks/destroy',
    data: playlisttrack,
    processData: false,
    contentType: false
  })
}

export const deletePlaylist = playlist_id => {
  $.ajax({
    method: 'DELETE',
    url: `/api/playlists/${playlist_id}`
  })
}

export const getPlaylist = (username, permalink) => {
  $.ajax({
    method: 'GET',
    url: `/api/playlists/get_playlist/${username}/${permalink}`
  })
}