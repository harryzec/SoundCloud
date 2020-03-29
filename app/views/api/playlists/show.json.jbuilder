
json.set! @playlist.id do
  json.extract! @playlist, :id, :user_id, :title, :description, :genre, :permalink
  json.tracks @playlist.tracks do |track|
    json.extract! track, :title, :id, :genre, :description, :hyperlink, :likes
    json.user track.user.username
    json.songUrl track.track.service_url
    if !track.photo.attached? 
      json.imgUrl nil
    else 
      json.imgUrl url_for(track.photo)
    end
  end
  if @playlist.photo.attached?
    json.imageUrl url_for(@playlist.photo)
  else 
    json.imageUrl nil
  end
end