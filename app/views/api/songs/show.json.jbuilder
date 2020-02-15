json.set! @song.id do
  json.extract! @song, :title, :id, :genre
  json.user @song.user.username
  json.songUrl @song.track.service_url
end