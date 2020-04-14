
json.extract! user, :id, :followers, :username, :session_token, :password_digest, :email, :created_at, :updated_at, :comments

json.songs user.songs.length

json.playlists user.playlists do |playlist|
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
    json.extract! track, :id
  end
  if playlist.photo.attached?
    json.imageUrl url_for(playlist.photo)
  else 
    json.imageUrl nil
  end

end

json.follows user.follows do |follow|
  user = User.find_by(id: follow.user_id)
  json.id user.id
  json.username user.username
  json.followers user.followers.length
  json.songs user.songs.length

  if user.profile_picture.attached?
    json.profileUrl url_for(user.profile_picture)
   else
     json.profileUrl nil
   end
 

end

json.comments user.comments do |comment|
  song = Song.find_by(id: comment.song_id)
  json.title song.title
  json.body comment.body
  json.hyperlink song.hyperlink
  json.username song.user.username
  json.created comment.convert_time
end

json.likes user.likes do |like|
  if like.likeable_type ==='Song'
    song = Song.find_by(id: like.likeable_id)
    json.id like.id
    json.user_id like.user_id
    json.type like.likeable_type
    json.likeable_id like.likeable_id
    json.title song.title
    
    json.songUrl song.track.service_url
    
    if !song.photo.attached? 
      json.imgUrl nil
    else 
      json.imgUrl url_for(song.photo)
    end

    json.hyperlink song.hyperlink
    json.username song.user.username
    json.plays song.plays
    json.likes song.likes.length
    json.comments song.comments.length

  elsif like.likeable_type ==='Playlist'
      playlist = Playlist.find_by(id: like.likeable_id)
      json.id like.id
      json.user_id like.user_id
      json.type like.likeable_type
      json.likeable_id like.likeable_id
      json.title playlist.title
      
      if !playlist.photo.attached? 
        json.imgUrl nil
      else 
        json.imgUrl url_for(playlist.photo)
      end
  
      json.hyperlink playlist.permalink
      json.username playlist.user.username
      json.likes playlist.likes.length
  
  
    
  end
end


if user.profile_picture.attached?
  json.profileUrl url_for(user.profile_picture)
else
  json.profileUrl nil
end

if user.cover_photo.attached?
  json.coverUrl url_for(user.cover_photo)
 else
   json.coverUrl nil
 end