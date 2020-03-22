json.set! @song.hyperlink do
  json.extract! @song, :title, :id, :genre, :description, :hyperlink, :comments
  json.user @song.user.username
  json.userImg url_for(@song.user.profile_picture)
  json.songUrl @song.track.service_url
  if !@song.photo.attached? 
    json.imgUrl nil
  else 
    json.imgUrl url_for(@song.photo)
  end
end