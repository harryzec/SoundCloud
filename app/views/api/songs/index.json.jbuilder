@songs.each do |song|
  json.set! song.id do
          json.extract! song, :title, :id, :user_id, :description, :genre
          json.user song.user.username
          json.songUrl song.track.service_url
  end
end