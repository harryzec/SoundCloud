

@RPlaylists.each do |playlist|
  
  
  json.set! playlist.id do
  json.extract! playlist, :id, :user_id, :title, :description, :genre, :permalink, :likes
  json.likes playlist.likes do |like|
    json.id like.id
    json.user_id like.user_id
    json.likeable_id like.likeable_id
    user = User.find_by(id: like.user_id)
    json.picture url_for(user.profile_picture)
    json.username user.username
  end
  json.username playlist.user.username
  # json.user playlist.user
  json.userImg url_for(playlist.user.profile_picture)
  json.usertracks playlist.user.songs.length
  json.follows playlist.user.followers.length

  json.tracks playlist.tracks do |track|
    json.extract! track, :title, :id, :genre, :description, :hyperlink, :likes, :plays
    json.user track.user.username
    json.playlist playlist.id
    
    json.songUrl track.track.service_url
    if !track.photo.attached? 
      json.imgUrl nil
    else 
      json.imgUrl url_for(track.photo)
    end
  end
  if playlist.photo.attached?
    json.imageUrl url_for(playlist.photo)
  else 
    json.imageUrl nil
  end
end
  
end