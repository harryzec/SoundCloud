export const fetchSong = (songId) => (
  $.ajax({
    url: `/api/songs/${songId}`
  })
)