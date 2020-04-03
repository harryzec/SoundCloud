@results.each do |search|
  json.set! search.created_at do
    if search.catagory == 'song'
      json.extract! search, :title, :id, :user_id, :description, :genre, :hyperlink, :comments, :catagory, :likes
      json.created search.convert_time
      json.user search.user.username
      json.creator search.user
      if search.user.profile_picture.attached?
        json.userpic url_for(search.user.profile_picture)
      else 
        json.userpic nil
      end
      json.songUrl search.track.service_url
      if !search.photo.attached? 
              json.imgUrl nil
      else 
        json.imgUrl url_for(search.photo)
      end

    elsif search.catagory == 'playlist'
      json.extract! search, :id, :title, :catagory, :likes, :permalink
      json.user search.user.username
      json.creator search.user
      json.created search.convert_time

      if search.user.profile_picture.attached?
        json.userpic url_for(search.user.profile_picture)
      else 
        json.userpic nil
      end

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
    end
   
  end
 
end

