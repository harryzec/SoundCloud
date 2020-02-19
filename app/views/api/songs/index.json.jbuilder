@songs.each do |song|
  json.set! song.id do
          json.extract! song, :title, :id, :user_id, :description, :genre, :hyperlink
          json.user song.user.username
          json.songUrl song.track.service_url
          if !song.photo.attached? 
            json.imgUrl nil
          else 
          json.imgUrl url_for(song.photo)
          end
  end
end
