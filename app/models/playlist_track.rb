class PlaylistTrack < ApplicationRecord
  validates :track_id, uniqueness: { scope: :playlist_id }, presence: true

    belongs_to :playlist,
    foreign_key: :playlist_id,
    class_name: :Playlist 

    belongs_to :song,
    foreign_key: :track_id,
    class_name: :Song
end
