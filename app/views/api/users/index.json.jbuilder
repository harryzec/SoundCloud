@users.each do |user|
  json.set! user.username do

    json.extract! user, :id, :username, :playlists, :followers
    json.songs user.songs.length

    if user.profile_picture.attached?
      json.profileUrl url_for(user.profile_picture)
     else
       json.profileUrl nil
     end
  end


end