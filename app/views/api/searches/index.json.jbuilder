

@searched.each do |search|
  json.set! search.id do
    if search.catagory == 'song'
      json.extract! search, :title, :id, :user_id, :description, :genre, :hyperlink, :comments, :catagory, :likes
      json.user search.user.username
      json.songUrl search.track.service_url
      if !search.photo.attached? 
              json.imgUrl nil
      else 
        json.imgUrl url_for(search.photo)
      end

    elsif search.catagory == 'playlist'
      json.extract! search, :title, :catagory, :likes, :id, :permalink
      json.user search.user

      json.tracks search.tracks do |track|
        json.extract! track, :title, :id, :genre, :description, :hyperlink, :likes, :plays
        json.user track.user.username
        json.songUrl track.track.service_url
        if !track.photo.attached? 
          json.imgUrl nil
        else 
          json.imgUrl url_for(track.photo)
        end
      end

      if search.photo.attached?
        json.imageUrl url_for(search.photo)
      else 
        json.imageUrl nil
      end

    elsif search.catagory == 'user'
      json.extract! search, :username, :catagory, :id
      json.follows search.followers.each do |follow|
        json.follower follow.follower_id
        json.id follow.id
      end

      if search.profile_picture.attached?
        json.profileUrl url_for(search.profile_picture)
       else
         json.profileUrl nil
       end
    end
   
  end
 
end

