class Song < ApplicationRecord
  validates :title, :user_id, :genre, :hyperlink, presence: true
  has_one_attached :track
  has_one_attached :photo
  # validate :track_attached

  belongs_to :user,
    foreign_key: :user_id,
    class_name: 'User'

  has_many :playlist_tracks,
    foreign_key: :track_id,
    class_name: :PlaylistTrack,
    dependent: :destroy

  has_many :playlists,
    through: :playlist_tracks,
    source: :playlist

  has_many :comments,
    foreign_key: :song_id,
    class_name: 'Comment',
    dependent: :destroy

  private 

  # def track_attached
  #   debugger
  #   if !track.attached? 
  #     debugger
  #     errors.add(:track, 'must be present')
  #   elsif !track.content_type.in?(%w(track/WAV track/FLAC track/AIFF track/ALAC track/MP3 track/AAC track/Ogg track/Vorbis track/MP4 track/MP2 track/M4A track/3GP track/3G2 track/MJ2 track/AMR track/WMA))
  #     debugger
  #     errors.add(:track, 'invalid file type')
  #   end
  # end
end
