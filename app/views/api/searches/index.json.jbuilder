@songs.each do |song|
 
    json.extract! song, :title, :id, :user_id, :description, :genre, :hyperlink, :comments
    json.user song.user.username
    json.songUrl song.track.service_url
    if !song.photo.attached? 
            json.imgUrl nil
    else 
      json.imgUrl url_for(song.photo)
    end
  
end

@playlists.each do |playlist|
  json.extract! playlist, :title
end

@users.each do |user|
  json.extract! user, :username
end

