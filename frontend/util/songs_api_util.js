export const fetchSong = (songId) => (
  $.ajax({
    url: `/api/songs/${songId}`
  })
)

export const createSong = (song) => (
  $.ajax({
    method: 'POST',
    url: '/api/songs',
    data: { song }
  })
)