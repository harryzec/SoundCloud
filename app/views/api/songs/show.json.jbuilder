json.set! @song.id do
  json.extract! @song, :title, :id, :genre, :description, :hyperlink, :comments
  json.user @song.user.username
  json.songUrl url_for(@song.track)
  if !@song.photo.attached? 
    json.imgUrl nil
  else 
    json.imgUrl url_for(@song.photo)
  end
end