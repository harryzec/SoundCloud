json.set! @song.hyperlink do
  json.extract! @song, :title, :id, :genre, :description, :hyperlink, :likes
  json.comments @song.comments do |comment|
    json.id comment.id
    json.body comment.body
    json.username comment.user.username
    json.created comment.convert_time
    if comment.user.profile_picture.attached?
      json.userpic url_for(comment.user.profile_picture)
     else
       json.userpic nil
     end
  end
  json.user @song.user.username
  json.userImg url_for(@song.user.profile_picture)
  json.songUrl @song.track.service_url
  if !@song.photo.attached? 
    json.imgUrl nil
  else 
    json.imgUrl url_for(@song.photo)
  end
end