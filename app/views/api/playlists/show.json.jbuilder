
json.set! @playlist.id do
  
  json.extract! @playlist, :id, :user_id, :title, :description, :genre, :permalink
  json.likes @playlist.likes do |like|
    json.id like.id
    json.user_id like.user_id
    json.likeable_id like.likeable_id
    user = User.find_by(id: like.user_id)
    json.picture url_for(user.profile_picture)
    json.username user.username
  end
  
  otherplaylists = Playlist.all.where(user_id: @playlist.user_id).shuffle.slice(0..2)

  json.related otherplaylists.each do |playlist|
    json.extract! playlist, :id, :user_id, :title, :permalink
    json.username playlist.user.username
    json.tracks playlist.tracks.length
    json.likes playlist.likes.length

    if playlist.photo.attached?
      json.imageUrl url_for(playlist.photo)
    else 
      json.imageUrl nil
    end

    
    if playlist.tracks.length > 0 
      if !playlist.tracks[0].photo.attached? 
        json.optionalpic nil
      else 
        json.optionalpic url_for(playlist.tracks[0].photo)
      end
    end
    
    


  end


  json.username @playlist.user.username
  json.user @playlist.user
  json.userImg url_for(@playlist.user.profile_picture)
  json.usertracks @playlist.user.songs.length
  json.follows @playlist.user.followers.length
  json.tracks @playlist.tracks do |track|
    json.playlist @playlist.id
    json.extract! track, :title, :id, :genre, :description, :hyperlink, :likes, :plays, :catagory
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