debugger
@songs.each do |song|
  json.extract! song, :title, :id
end