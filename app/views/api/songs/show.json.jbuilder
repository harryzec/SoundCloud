json.set! @song.id do
  json.extract! @song, :title, :id, :genre, :description
  json.user @song.user.username
  json.songUrl url_for(@song.track)
  json.imgUrl url_for(@song.photo)
end