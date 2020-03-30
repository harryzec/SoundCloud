

@searched.each do |search|
  json.set! search.id do
    if search.catagory == 'song'
      json.extract! search, :title, :id, :user_id, :description, :genre, :hyperlink, :comments, :catagory
      json.user search.user
      json.songUrl search.track.service_url
      if !search.photo.attached? 
              json.imgUrl nil
      else 
        json.imgUrl url_for(search.photo)
      end

    elsif search.catagory == 'playlist'
      json.extract! search, :title, :catagory

      if search.photo.attached?
        json.imageUrl url_for(search.photo)
      else 
        json.imageUrl nil
      end

    elsif search.catagory == 'user'
      json.extract! search, :username, :catagory
      
      if search.profile_picture.attached?
        json.profileUrl url_for(search.profile_picture)
       else
         json.profileUrl nil
       end
    end
   
  end
 
end

