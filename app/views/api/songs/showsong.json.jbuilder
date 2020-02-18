json.set! @song.hyperlink do
  json.extract! @song, :title, :id, :genre, :description, :hyperlink
  json.user @song.user.username
  json.songUrl @song.track.service_url
end