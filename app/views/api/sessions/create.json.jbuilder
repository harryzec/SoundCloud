json.extract! @user, :id, :playlists, :followers, :username, :session_token, :password_digest, :email, :created_at, :updated_at

json.follows @user.follows do |follow|
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

json.likes @user.likes do |like|
  if like.likeable_type ==='Song'
    song = Song.find_by(id: like.likeable_id)
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


  end
end


if @user.profile_picture.attached?
  json.profileUrl url_for(@user.profile_picture)
else
  json.profileUrl null
end

if @user.cover_photo.attached?
  json.coverUrl url_for(@user.cover_photo)
 else
   json.coverUrl nil
 end