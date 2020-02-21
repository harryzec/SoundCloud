@RPlaylists.each do |playlist|
  json.set! playlist.id do

  json.extract! playlist, :id, :user_id, :title
  if playlist.photo.attached?
    json.imageUrl url_for(playlist.photo)
  else 
    json.imageUrl nil
  end
end
  
end