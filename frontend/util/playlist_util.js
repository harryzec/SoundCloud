export const fetchPlaylists = ( ) => (
  $.ajax({
    url: '/api/playlists'
  })
)