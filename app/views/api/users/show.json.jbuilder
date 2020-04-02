

json.set! @user.username do

  json.extract! @user, :id, :username, :playlists, :followers, :comments
  json.songs @user.songs.length

  json.comments @user.comments do |comment|
    song = Song.find_by(id: comment.user_id)
    json.title song.title
    json.body comment.body
    json.hyperlink song.hyperlink
    json.username song.user.username
    json.created comment.convert_time
  end

  json.follows @user.follows do |follow|
    user = User.find_by(id: follow.user_id)
    json.id user.id
    json.username user.username
    json.followers user.followers.length
    json.songs user.songs.length

    if user.profile_picture.attached?
      json.profileUrl url_for(uuser.profile_picture)
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
      json.likes song.likes.length
      json.comments song.comments.length
      json.plays song.plays


    end
  end

  if @user.profile_picture.attached?
   json.profileUrl url_for(@user.profile_picture)
  else
    json.profileUrl nil
  end

  if @user.cover_photo.attached?
   json.coverUrl url_for(@user.cover_photo)
  else
    json.coverUrl nil
  end

end